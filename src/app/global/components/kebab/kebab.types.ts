export interface KebabOption {
    label: string;
    action: string;
    icon?: string; // Optional icon for the menu item
    variant?: 'default' | 'danger'; // For red delete buttons etc.
}
