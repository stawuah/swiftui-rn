// Import all node classes from nodes file
import {
  VStackNode,
  HStackNode,
  ZStackNode,
  ScrollNode,
  SafeAreaNode,
  TextNode,
  ButtonNode,
  ImageNode,
  InputNode,
  SpacerNode,
  DividerNode,
} from './nodes';

// Import AnyNode type for type checking
import { AnyNode } from './types';

// ========== FACTORY FUNCTIONS ==========
// These are the main functions developers import and use to create UI
// They provide a clean, simple API without needing to know about node classes

// Create a vertical stack - arranges children in a column
// Alternative: Could use new VStackNode() directly
export const VStack = (...children: AnyNode[]) => new VStackNode(...children);

// Create a horizontal stack - arranges children in a row
// Alternative: Could use new HStackNode() directly
export const HStack = (...children: AnyNode[]) => new HStackNode(...children);

// Create a layered stack - stacks children on top of each other
// Alternative: Could use new ZStackNode() directly
export const ZStack = (...children: AnyNode[]) => new ZStackNode(...children);

// Create a scrollable container
// Alternative: Could use new ScrollNode() directly
export const ScrollView = (...children: AnyNode[]) => new ScrollNode(...children);

// Create a safe area container
// Alternative: Could use new SafeAreaNode() directly
export const SafeArea = (...children: AnyNode[]) => new SafeAreaNode(...children);

// Create a text element
// Alternative: Could use new TextNode() directly
export const Text = (content: string) => new TextNode(content);

// Create a button with optional press handler
// Alternative: Could use new ButtonNode() directly
export const Button = (label: string, onPress?: () => void) => new ButtonNode(label, onPress);

// Create an image element
// Alternative: Could use new ImageNode() directly
export const Image = (src: string | { uri: string }) => new ImageNode(src);

// Create an input field with optional placeholder
// Alternative: Could use new InputNode() directly
export const Input = (placeholder?: string) => new InputNode(placeholder);

// Create a spacer element
// Alternative: Could use new SpacerNode() directly
export const Spacer = () => new SpacerNode();

// Create a divider element
// Alternative: Could use new DividerNode() directly
export const Divider = () => new DividerNode();

// ========== RE-EXPORT RENDER COMPONENT ==========
// This component is needed to actually display the node tree

// Export the Render component from renderer file
// Alternative: Could import directly from './renderer'
export { Render } from './renderer';

// ========== RE-EXPORT NODE CLASSES ==========
// These are exported for advanced users who want to extend or customize nodes

// Re-export all node classes for direct use if needed
export {
  VStackNode,
  HStackNode,
  ZStackNode,
  ScrollNode,
  SafeAreaNode,
  TextNode,
  ButtonNode,
  ImageNode,
  InputNode,
  SpacerNode,
  DividerNode,
} from './nodes';

// ========== RE-EXPORT TYPES ==========
// These are exported for type checking and custom component creation

// Re-export all types for type checking
export type {
  NodeType,
  AnyNode,
  NodeProps,
} from './types';

// Re-export ViewNode base class for creating custom nodes
// Alternative: Could create custom nodes by extending ViewNode directly
export { ViewNode } from './types';
