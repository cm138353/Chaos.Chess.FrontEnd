import { BrowserPlatform } from '@aurelia/platform-browser';
import { setPlatform } from '@aurelia/testing';

export function bootstrapTestEnvironment() {
    const platform = new BrowserPlatform(window);
    setPlatform(platform);
    BrowserPlatform.set(globalThis, platform);
}