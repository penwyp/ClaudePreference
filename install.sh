#!/bin/bash
#
# ClaudePreference Installation Script
# 
# Installs ClaudePreference commands to Claude Code configuration directory
# Based on the comprehensive plan in plan.md
#

set -euo pipefail

# Script metadata
readonly SCRIPT_NAME="ClaudePreference Installer"
readonly SCRIPT_VERSION="2.0.0"
readonly REPO_URL="https://github.com/penwyp/ClaudePreference"

# Default configuration
readonly DEFAULT_INSTALL_DIR="$HOME/.claude/commands/m"
readonly BACKUP_DIR="$HOME/.claude/backups"
readonly MANIFEST_FILE="$HOME/.claude/.claudepreference-manifest"
readonly COMMANDS_SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/commands"

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Global variables
INSTALL_DIR="$DEFAULT_INSTALL_DIR"
DRY_RUN=false
FORCE=false
UPDATE=false
UNINSTALL=false
ROLLBACK=false
VERBOSE=false
CUSTOM_DIR=false

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $*"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $*"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $*"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $*" >&2
}

log_verbose() {
    if [[ "$VERBOSE" == true ]]; then
        echo -e "${BLUE}[VERBOSE]${NC} $*"
    fi
}

# Display help information
show_help() {
    cat << EOF
$SCRIPT_NAME v$SCRIPT_VERSION

USAGE:
    $0 [OPTIONS]

DESCRIPTION:
    Install, update, or manage ClaudePreference commands for Claude Code CLI.

OPTIONS:
    --dir PATH        Custom installation directory (default: ~/.claude/commands/m)
    --update          Update existing installation
    --force           Overwrite files without prompting
    --dry-run         Preview changes without installing
    --uninstall       Remove ClaudePreference commands
    --rollback        Restore from latest backup
    --verbose         Enable detailed logging
    --help            Show this help message

EXAMPLES:
    $0                          # Install to default location
    $0 --dir /custom/path       # Install to custom directory
    $0 --update                 # Update existing installation
    $0 --dry-run --verbose      # Preview installation with details
    $0 --uninstall              # Remove ClaudePreference commands

For more information, visit: $REPO_URL
EOF
}

# Parse command line arguments
parse_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            --dir)
                INSTALL_DIR="$2"
                CUSTOM_DIR=true
                shift 2
                ;;
            --update)
                UPDATE=true
                shift
                ;;
            --force)
                FORCE=true
                shift
                ;;
            --dry-run)
                DRY_RUN=true
                shift
                ;;
            --uninstall)
                UNINSTALL=true
                shift
                ;;
            --rollback)
                ROLLBACK=true
                shift
                ;;
            --verbose)
                VERBOSE=true
                shift
                ;;
            --help)
                show_help
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                log_info "Use --help for usage information"
                exit 1
                ;;
        esac
    done
}

# Validate system requirements
validate_system() {
    log_verbose "Validating system requirements..."
    
    # Check bash version (relaxed for macOS compatibility)
    local bash_major=${BASH_VERSION%%.*}
    local bash_minor
    bash_minor=$(echo "${BASH_VERSION#*.}" | cut -d'.' -f1)
    if [[ $bash_major -lt 3 || ($bash_major -eq 3 && $bash_minor -lt 2) ]]; then
        log_error "Bash version 3.2 or higher required. Current version: $BASH_VERSION"
        exit 1
    fi
    
    # Check required commands
    local required_commands=(cp mkdir rm mv chmod find)
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            log_error "Required command not found: $cmd"
            exit 1
        fi
    done
    
    # Check if Claude Code is available (optional warning)
    if ! command -v claude &> /dev/null; then
        log_warning "Claude Code CLI not found in PATH. Please ensure it's installed."
    fi
    
    log_verbose "System validation completed successfully"
}

# Check if installation directory is writable
check_write_permissions() {
    local target_dir="$1"
    local parent_dir
    
    # Create parent directories if they don't exist
    parent_dir="$(dirname "$target_dir")"
    if [[ ! -d "$parent_dir" ]]; then
        if [[ "$DRY_RUN" == false ]]; then
            log_verbose "Creating parent directory: $parent_dir"
            mkdir -p "$parent_dir" || {
                log_error "Failed to create parent directory: $parent_dir"
                exit 1
            }
        else
            log_info "[DRY RUN] Would create parent directory: $parent_dir"
        fi
    fi
    
    # Check write permissions
    if [[ -d "$target_dir" ]]; then
        if [[ ! -w "$target_dir" ]]; then
            log_error "No write permission to directory: $target_dir"
            exit 1
        fi
    else
        if [[ "$DRY_RUN" == false ]]; then
            log_verbose "Creating target directory: $target_dir"
            mkdir -p "$target_dir" || {
                log_error "Failed to create target directory: $target_dir"
                exit 1
            }
        else
            log_info "[DRY RUN] Would create target directory: $target_dir"
        fi
    fi
}

# Detect existing ClaudePreference installation
detect_installation() {
    log_verbose "Detecting existing installation..."
    
    if [[ -f "$MANIFEST_FILE" ]]; then
        log_verbose "Found existing installation manifest"
        return 0
    fi
    
    # Check for ClaudePreference command files (new structure)
    if [[ -d "$INSTALL_DIR" ]]; then
        local cp_files
        cp_files=$(find "$INSTALL_DIR" -name "*.md" 2>/dev/null | wc -l)
        if [[ $cp_files -gt 0 ]]; then
            log_verbose "Found $cp_files ClaudePreference command files in new structure"
            return 0
        fi
    fi
    
    # Check for legacy installation
    if detect_legacy_installation; then
        return 0
    fi
    
    return 1
}

# Transform filename by stripping m- prefix
transform_filename() {
    local filename="$1"
    if [[ "$filename" =~ ^m-(.+)\.md$ ]]; then
        echo "${BASH_REMATCH[1]}.md"
    else
        echo "$filename"
    fi
}

# Detect legacy installation (old structure)
detect_legacy_installation() {
    local legacy_dir="$HOME/.claude/commands"
    if [[ -d "$legacy_dir" ]]; then
        local legacy_files
        legacy_files=$(find "$legacy_dir" -maxdepth 1 -name "m-*.md" 2>/dev/null | wc -l)
        if [[ $legacy_files -gt 0 ]]; then
            log_verbose "Found $legacy_files legacy command files in $legacy_dir"
            return 0
        fi
    fi
    return 1
}

# Create backup of existing installation
create_backup() {
    local backup_name="claudepreference-backup-$(date +%Y%m%d-%H%M%S)"
    local backup_path="$BACKUP_DIR/$backup_name"
    
    log_info "Creating backup: $backup_path"
    
    if [[ "$DRY_RUN" == true ]]; then
        log_info "[DRY RUN] Would create backup at: $backup_path"
        return 0
    fi
    
    # Create backup directory
    mkdir -p "$backup_path" || {
        log_error "Failed to create backup directory"
        exit 1
    }
    
    # Backup existing commands if they exist
    if [[ -d "$INSTALL_DIR" ]]; then
        cp -r "$INSTALL_DIR"/* "$backup_path/" 2>/dev/null || true
    fi
    
    # Also backup legacy files if they exist
    local legacy_dir="$HOME/.claude/commands"
    if [[ -d "$legacy_dir" && "$INSTALL_DIR" != "$legacy_dir" ]]; then
        mkdir -p "$backup_path/legacy" 2>/dev/null || true
        find "$legacy_dir" -maxdepth 1 -name "m-*.md" -exec cp {} "$backup_path/legacy/" \; 2>/dev/null || true
    fi
    
    # Backup manifest if it exists
    if [[ -f "$MANIFEST_FILE" ]]; then
        cp "$MANIFEST_FILE" "$backup_path/" || true
    fi
    
    log_verbose "Backup created successfully at: $backup_path"
    echo "$backup_path" > "$HOME/.claude/.claudepreference-last-backup"
}

# Migrate legacy installation to new structure
migrate_legacy_installation() {
    local legacy_dir="$HOME/.claude/commands"
    log_info "Migrating legacy installation from $legacy_dir to $INSTALL_DIR"
    
    if [[ "$DRY_RUN" == true ]]; then
        log_info "[DRY RUN] Would migrate legacy files to new structure"
        return 0
    fi
    
    local migrated_count=0
    
    # Find and migrate legacy files
    while IFS= read -r -d '' legacy_file; do
        local filename
        filename="$(basename "$legacy_file")"
        local new_filename
        new_filename="$(transform_filename "$filename")"
        local target_file="$INSTALL_DIR/$new_filename"
        
        log_verbose "Migrating: $filename → $new_filename"
        
        # Copy to new location with new name
        cp "$legacy_file" "$target_file" || {
            log_error "Failed to migrate: $filename"
            exit 1
        }
        chmod 644 "$target_file"
        ((migrated_count++))
        
    done < <(find "$legacy_dir" -maxdepth 1 -name "m-*.md" -print0 2>/dev/null)
    
    if [[ $migrated_count -gt 0 ]]; then
        log_success "Migrated $migrated_count legacy command files"
        
        # Ask user if they want to remove legacy files
        if [[ "$FORCE" == false ]]; then
            read -p "Remove legacy files from $legacy_dir? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                find "$legacy_dir" -maxdepth 1 -name "m-*.md" -delete 2>/dev/null || true
                log_info "Legacy files removed"
            fi
        else
            find "$legacy_dir" -maxdepth 1 -name "m-*.md" -delete 2>/dev/null || true
            log_info "Legacy files removed (force mode)"
        fi
    fi
}

# Verify source commands exist
verify_source_commands() {
    log_verbose "Verifying source commands directory..."
    
    if [[ ! -d "$COMMANDS_SOURCE_DIR" ]]; then
        log_error "Commands source directory not found: $COMMANDS_SOURCE_DIR"
        log_error "Please run this script from the ClaudePreference repository root"
        exit 1
    fi
    
    local command_files
    command_files=$(find "$COMMANDS_SOURCE_DIR" -name "*.md" 2>/dev/null | wc -l)
    
    if [[ $command_files -eq 0 ]]; then
        log_error "No command files found in: $COMMANDS_SOURCE_DIR"
        exit 1
    fi
    
    log_verbose "Found $command_files command files to install"
}

# Install commands
install_commands() {
    log_info "Installing ClaudePreference commands to: $INSTALL_DIR"
    
    local installed_count=0
    local skipped_count=0
    
    # Process each command file
    while IFS= read -r -d '' file; do
        local filename
        filename="$(basename "$file")"
        local new_filename
        new_filename="$(transform_filename "$filename")"
        local target_file="$INSTALL_DIR/$new_filename"
        
        # Check if file exists and handle conflicts
        if [[ -f "$target_file" && "$FORCE" == false && "$DRY_RUN" == false ]]; then
            if [[ "$UPDATE" == true ]]; then
                # In update mode, compare checksums
                if command -v sha256sum &> /dev/null; then
                    local source_hash target_hash
                    source_hash=$(sha256sum "$file" | cut -d' ' -f1)
                    target_hash=$(sha256sum "$target_file" | cut -d' ' -f1)
                    
                    if [[ "$source_hash" == "$target_hash" ]]; then
                        log_verbose "Skipping $new_filename (unchanged)"
                        ((skipped_count++))
                        continue
                    fi
                fi
            else
                read -p "File exists: $new_filename. Overwrite? (y/N): " -n 1 -r
                echo
                if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                    log_verbose "Skipping $new_filename (user choice)"
                    ((skipped_count++))
                    continue
                fi
            fi
        fi
        
        # Install the file
        if [[ "$DRY_RUN" == true ]]; then
            log_info "[DRY RUN] Would install: $filename → $new_filename"
        else
            log_verbose "Installing: $filename → $new_filename"
            cp "$file" "$target_file" || {
                log_error "Failed to install: $filename"
                exit 1
            }
            chmod 644 "$target_file"
        fi
        
        ((installed_count++))
        
    done < <(find "$COMMANDS_SOURCE_DIR" -name "*.md" -print0)
    
    log_success "Installation completed: $installed_count files installed, $skipped_count skipped"
}

# Create installation manifest
create_manifest() {
    if [[ "$DRY_RUN" == true ]]; then
        log_info "[DRY RUN] Would create installation manifest"
        return 0
    fi
    
    log_verbose "Creating installation manifest..."
    
    cat > "$MANIFEST_FILE" << EOF
# ClaudePreference Installation Manifest
# Generated: $(date -Iseconds)
install_dir=$INSTALL_DIR
version=$SCRIPT_VERSION
timestamp=$(date +%s)
custom_dir=$CUSTOM_DIR
EOF
    
    # Add list of installed files (new structure uses files without m- prefix)
    echo "# Installed files:" >> "$MANIFEST_FILE"
    find "$INSTALL_DIR" -name "*.md" -exec basename {} \; | sort >> "$MANIFEST_FILE"
    
    log_verbose "Installation manifest created"
}

# Uninstall ClaudePreference commands
uninstall_commands() {
    log_info "Uninstalling ClaudePreference commands..."
    
    if [[ ! -f "$MANIFEST_FILE" ]]; then
        log_warning "No installation manifest found. Attempting automatic detection..."
        
        local removed_count=0
        
        # Check new structure first
        if [[ -d "$INSTALL_DIR" ]]; then
            local cp_files
            mapfile -t cp_files < <(find "$INSTALL_DIR" -name "*.md" 2>/dev/null)
            
            if [[ ${#cp_files[@]} -gt 0 ]]; then
                log_info "Found ${#cp_files[@]} ClaudePreference command files in new structure"
                
                if [[ "$FORCE" == false ]]; then
                    read -p "Remove these files? (y/N): " -n 1 -r
                    echo
                    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                        log_info "Uninstall cancelled"
                        return 0
                    fi
                fi
                
                # Remove files
                for file in "${cp_files[@]}"; do
                    if [[ "$DRY_RUN" == true ]]; then
                        log_info "[DRY RUN] Would remove: $(basename "$file")"
                    else
                        log_verbose "Removing: $(basename "$file")"
                        rm "$file"
                    fi
                    ((removed_count++))
                done
                
                # Remove empty directory if it only contains ClaudePreference commands
                if [[ "$DRY_RUN" == false && -d "$INSTALL_DIR" ]]; then
                    rmdir "$INSTALL_DIR" 2>/dev/null && log_verbose "Removed empty directory: $INSTALL_DIR" || true
                fi
            fi
        fi
        
        # Check legacy structure
        local legacy_dir="$HOME/.claude/commands"
        if [[ -d "$legacy_dir" ]]; then
            local legacy_files
            mapfile -t legacy_files < <(find "$legacy_dir" -maxdepth 1 -name "m-*.md" 2>/dev/null)
            
            if [[ ${#legacy_files[@]} -gt 0 ]]; then
                log_info "Found ${#legacy_files[@]} legacy ClaudePreference command files"
                
                if [[ "$FORCE" == false ]]; then
                    read -p "Remove legacy files? (y/N): " -n 1 -r
                    echo
                    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                        log_info "Legacy uninstall cancelled"
                    else
                        # Remove legacy files
                        for file in "${legacy_files[@]}"; do
                            if [[ "$DRY_RUN" == true ]]; then
                                log_info "[DRY RUN] Would remove legacy: $(basename "$file")"
                            else
                                log_verbose "Removing legacy: $(basename "$file")"
                                rm "$file"
                            fi
                            ((removed_count++))
                        done
                    fi
                else
                    # Force mode - remove legacy files
                    for file in "${legacy_files[@]}"; do
                        if [[ "$DRY_RUN" == true ]]; then
                            log_info "[DRY RUN] Would remove legacy: $(basename "$file")"
                        else
                            log_verbose "Removing legacy: $(basename "$file")"
                            rm "$file"
                        fi
                        ((removed_count++))
                    done
                fi
            fi
        fi
        
        if [[ $removed_count -eq 0 ]]; then
            log_warning "No ClaudePreference command files found"
            return 0
        fi
        
        log_success "Uninstalled $removed_count ClaudePreference command files"
    else
        # Use manifest for precise uninstall
        local install_dir
        install_dir=$(grep "^install_dir=" "$MANIFEST_FILE" | cut -d'=' -f2)
        
        log_verbose "Using installation directory from manifest: $install_dir"
        
        # Remove files listed in manifest
        local removed_count=0
        while IFS= read -r filename; do
            # Skip comment lines and empty lines
            if [[ "$filename" =~ ^#.*$ ]] || [[ -z "$filename" ]]; then
                continue
            fi
            
            # Handle both old (m-*.md) and new (*.md) filename formats
            local file_path="$install_dir/$filename"
            if [[ -f "$file_path" ]]; then
                if [[ "$DRY_RUN" == true ]]; then
                    log_info "[DRY RUN] Would remove: $filename"
                else
                    log_verbose "Removing: $filename"
                    rm "$file_path"
                fi
                ((removed_count++))
            fi
        done < "$MANIFEST_FILE"
        
        # Remove manifest
        if [[ "$DRY_RUN" == false ]]; then
            rm "$MANIFEST_FILE"
        fi
        
        log_success "Uninstalled $removed_count ClaudePreference command files"
    fi
}

# Rollback to latest backup
rollback_installation() {
    log_info "Rolling back to latest backup..."
    
    local last_backup_file="$HOME/.claude/.claudepreference-last-backup"
    if [[ ! -f "$last_backup_file" ]]; then
        log_error "No backup information found"
        exit 1
    fi
    
    local backup_path
    backup_path=$(cat "$last_backup_file")
    
    if [[ ! -d "$backup_path" ]]; then
        log_error "Backup directory not found: $backup_path"
        exit 1
    fi
    
    log_info "Restoring from backup: $backup_path"
    
    if [[ "$DRY_RUN" == true ]]; then
        log_info "[DRY RUN] Would restore from: $backup_path"
        return 0
    fi
    
    # Remove current installation
    if [[ -d "$INSTALL_DIR" ]]; then
        find "$INSTALL_DIR" -name "m-*.md" -delete 2>/dev/null || true
    fi
    
    # Restore from backup
    if [[ -d "$backup_path" ]]; then
        cp -r "$backup_path"/* "$INSTALL_DIR/" 2>/dev/null || true
        
        # Restore manifest if it exists in backup
        if [[ -f "$backup_path/.claudepreference-manifest" ]]; then
            cp "$backup_path/.claudepreference-manifest" "$MANIFEST_FILE"
        fi
    fi
    
    log_success "Rollback completed successfully"
}

# Main installation workflow
main() {
    echo "=================================================="
    echo "  $SCRIPT_NAME v$SCRIPT_VERSION"
    echo "=================================================="
    echo
    
    # Parse command line arguments
    parse_arguments "$@"
    
    # Handle special operations first
    if [[ "$ROLLBACK" == true ]]; then
        rollback_installation
        exit 0
    fi
    
    if [[ "$UNINSTALL" == true ]]; then
        uninstall_commands
        exit 0
    fi
    
    # Validate system
    validate_system
    
    # Verify source commands
    verify_source_commands
    
    # Check installation directory permissions
    check_write_permissions "$INSTALL_DIR"
    
    # Handle existing installation
    local has_legacy=false
    if detect_legacy_installation; then
        has_legacy=true
    fi
    
    if detect_installation; then
        if [[ "$UPDATE" == true ]]; then
            log_info "Updating existing ClaudePreference installation"
            
            # Handle legacy migration during update
            if [[ "$has_legacy" == true ]]; then
                log_info "Legacy installation detected - will migrate to new structure"
            fi
        else
            log_warning "Existing ClaudePreference installation detected"
            if [[ "$FORCE" == false && "$DRY_RUN" == false ]]; then
                read -p "Continue with installation? (y/N): " -n 1 -r
                echo
                if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                    log_info "Installation cancelled"
                    exit 2
                fi
            fi
        fi
        
        # Create backup before proceeding
        create_backup
        
        # Migrate legacy installation if present
        if [[ "$has_legacy" == true ]]; then
            migrate_legacy_installation
        fi
    fi
    
    # Install commands
    install_commands
    
    # Create installation manifest
    create_manifest
    
    # Display success message
    echo
    log_success "ClaudePreference installation completed!"
    echo
    echo "Commands installed to: $INSTALL_DIR"
    echo
    echo "To use ClaudePreference commands:"
    echo "  1. Run 'claude' in your project directory"
    echo "  2. Type '/' to see available commands"
    echo "  3. Select any 'm:' command (e.g., /m:orchestrated-dev)"
    echo
    echo "For more information, visit: $REPO_URL"
}

# Execute main function with all arguments
main "$@"