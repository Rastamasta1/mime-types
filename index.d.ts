// Type definitions for mime-types
// Project: https://github.com/jshttp/mime-types
// These declarations are generated to match the public surface index.js
// assigns onto `exports` (every `exports.NAME = ...` statement).

declare namespace mimeTypes {
  /**
   * Get the default charset for a MIME type.
   */
  function charset(type: string): false | string;

  /**
   * Create a full Content-Type header given a MIME type or extension.
   */
  function contentType(str: string): false | string;

  /**
   * Get the default extension for a MIME type.
   */
  function extension(type: string): false | string;

  /**
   * Lookup the MIME type for a file path/extension.
   */
  function lookup(path: string): false | string;

  /**
   * Alias object exposing `.lookup` for charset resolution.
   */
  const charsets: {
    lookup(type: string): false | string;
  };

  /**
   * A map of extensions by content-type.
   */
  const extensions: {
    [type: string]: string[];
  };

  /**
   * A map of content-types by extension.
   */
  const types: {
    [extension: string]: string;
  };
}

export = mimeTypes;
