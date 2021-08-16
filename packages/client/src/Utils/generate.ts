import React from 'react';

/**
 * Generates array of elements
 * @param array Data to put into element
 * @param element Component
 * @param key Custom key name
 * @param override Override children
 * @returns React Element Array
 */
export default function generate(
  array: any[],
  element: React.ReactElement,
  key?: string,
  override?: any
): React.ReactElement<any, string | React.JSXElementConstructor<any>>[] {
  return array.map((item, index) =>
    React.cloneElement(element, {
      key: `${key || 'item'}-${index + 1}`,
      children: override || item,
    })
  );
}
