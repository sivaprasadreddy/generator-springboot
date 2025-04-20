/**
 * Main application generator
 * This is the entry point for 'yo springboot' that delegates to the server generator
 *
 * Note: We're using a simpler approach where the app generator is just a reference to the server generator.
 * This ensures compatibility with Yeoman's generator resolution mechanism.
 */
import ServerGenerator from '../server';
export default ServerGenerator;
