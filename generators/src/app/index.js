"use strict";
/**
 * Main application generator
 * This is the entry point for 'yo springboot' that delegates to the server generator
 *
 * Note: We're using a simpler approach where the app generator is just a reference to the server generator.
 * This ensures compatibility with Yeoman's generator resolution mechanism.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Re-export the server generator 
const server_1 = __importDefault(require("../server"));
exports.default = server_1.default;
