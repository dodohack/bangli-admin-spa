/**
 * Cms channel,
 * Bangli domain includes: shopping, travel, life(wiki), culture, edu, university
 * Huluwa domain includes: product, wiki
 */
    
export interface Channel {
    id: number;
    text: string;  // Same as name name. for ng2-select only
    slug: string;
    name: string;
    description: string;
}
