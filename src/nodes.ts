// Import base ViewNode class and types
import { ViewNode, AnyNode, NodeProps } from './types';

// Vertical stack node - arranges children in a column (top to bottom)
// Alternative: Could use Flexbox with flexDirection: 'column' directly
export class VStackNode extends ViewNode<VStackNode> {
  constructor(...children: AnyNode[]) {
    // Initialize with column direction for vertical layout
    super('VStack', { flexDirection: 'column' }, children);
  }
}

// Horizontal stack node - arranges children in a row (left to right)
// Alternative: Could use Flexbox with flexDirection: 'row' directly
export class HStackNode extends ViewNode<HStackNode> {
  constructor(...children: AnyNode[]) {
    // Initialize with row direction and center alignment for horizontal layout
    super('HStack', { flexDirection: 'row', alignItems: 'center' }, children);
  }
}

// Layered stack node - stacks children on top of each other
// Alternative: Could use absolute positioning for each child
export class ZStackNode extends ViewNode<ZStackNode> {
  constructor(...children: AnyNode[]) {
    // Initialize with relative positioning for layered layout
    super('ZStack', { position: 'relative' }, children);
  }
}

// Scrollable container node - wraps children in a scroll view
// Alternative: Could use FlatList or SectionList for large lists
export class ScrollNode extends ViewNode<ScrollNode> {
  private _horizontal: boolean = false; // Track scroll direction

  constructor(...children: AnyNode[]) {
    // Initialize without any scroll-specific props
    super('ScrollView', {}, children);
  }

  // Enable horizontal scrolling (default is vertical)
  horizontal(): ScrollNode {
    this._horizontal = true;
    return this;
  }

  // Check if scrolling is horizontal
  get isHorizontal(): boolean {
    return this._horizontal;
  }
}

// Safe area node - respects device safe areas (notches, home indicator)
// Alternative: Could use SafeAreaView from react-native-safe-area-context
export class SafeAreaNode extends ViewNode<SafeAreaNode> {
  constructor(...children: AnyNode[]) {
    // Initialize with no special props
    super('SafeArea', {}, children);
  }
}

// Text node - displays text content
// Alternative: Could use Text component directly with StyleSheet
export class TextNode extends ViewNode<TextNode> {
  constructor(text: string) {
    // Initialize with text content
    super('Text', { text }, []);
  }

  // ========== TEXT-SPECIFIC MODIFIERS ==========

  // Set text color
  color(color: string): TextNode {
    return this._updateProps({ color });
  }

  // Set font size in pixels
  fontSize(size: number): TextNode {
    return this._updateProps({ fontSize: size });
  }

  // Set font weight (normal, bold, or numeric 100-900)
  fontWeight(weight: NodeProps['fontWeight']): TextNode {
    return this._updateProps({ fontWeight: weight });
  }

  // Set font family name
  fontFamily(family: string): TextNode {
    return this._updateProps({ fontFamily: family });
  }

  // Set line height (space between lines)
  lineHeight(height: number): TextNode {
    return this._updateProps({ lineHeight: height });
  }

  // Set letter spacing (space between characters)
  letterSpacing(spacing: number): TextNode {
    return this._updateProps({ letterSpacing: spacing });
  }

  // Set text alignment (left, center, right, etc.)
  textAlign(align: NodeProps['textAlign']): TextNode {
    return this._updateProps({ textAlign: align });
  }

  // Convert text to uppercase
  uppercase(): TextNode {
    return this._updateProps({ textTransform: 'uppercase' });
  }

  // Convert text to lowercase
  lowercase(): TextNode {
    return this._updateProps({ textTransform: 'lowercase' });
  }

  // Capitalize first letter of each word
  capitalize(): TextNode {
    return this._updateProps({ textTransform: 'capitalize' });
  }

  // Add underline to text
  // Alternative: Could use textDecorationLine: 'underline' directly
  underline(): TextNode {
    const current = this._props.textDecorationLine || 'none';
    const newDecoration = current === 'none' ? 'underline' : 
                          current.includes('underline') ? current.replace('underline', '').trim() || 'none' :
                          `${current} underline`;
    return this._updateProps({ textDecorationLine: newDecoration as any });
  }

  // Add strikethrough to text
  // Alternative: Could use textDecorationLine: 'line-through' directly
  strikethrough(): TextNode {
    const current = this._props.textDecorationLine || 'none';
    const newDecoration = current === 'none' ? 'line-through' : 
                          current.includes('line-through') ? current.replace('line-through', '').trim() || 'none' :
                          `${current} line-through`;
    return this._updateProps({ textDecorationLine: newDecoration as any });
  }

  // Set maximum number of lines (text will truncate if longer)
  numberOfLines(lines: number): TextNode {
    return this._updateProps({ numberOfLines: lines });
  }

  // ========== TEXT PRESET STYLES ==========

  // Bold font weight
  bold(): TextNode {
    return this._updateProps({ fontWeight: 'bold' });
  }

  // Semibold font weight (600)
  semibold(): TextNode {
    return this._updateProps({ fontWeight: '600' });
  }

  // Thin font weight (300)
  thin(): TextNode {
    return this._updateProps({ fontWeight: '300' });
  }

  // Small font size (12px)
  small(): TextNode {
    return this._updateProps({ fontSize: 12 });
  }

  // Body font size (14px) - standard text
  body(): TextNode {
    return this._updateProps({ fontSize: 14 });
  }

  // Title style (18px, semibold)
  title(): TextNode {
    return this._updateProps({ fontSize: 18, fontWeight: '600' });
  }

  // Headline style (24px, bold)
  headline(): TextNode {
    return this._updateProps({ fontSize: 24, fontWeight: 'bold' });
  }

  // Caption style (11px, slightly transparent)
  caption(): TextNode {
    return this._updateProps({ fontSize: 11, opacity: 0.7 });
  }

  // Muted style (60% opacity)
  muted(): TextNode {
    return this._updateProps({ opacity: 0.6 });
  }
}

// Button node - clickable button with text label
// Alternative: Could use TouchableOpacity with Text child
export class ButtonNode extends ViewNode<ButtonNode> {
  constructor(text: string, onPress?: () => void) {
    // Initialize with text and optional press handler
    super('Button', { text, onPress }, []);
  }

  // ========== BUTTON-SPECIFIC MODIFIERS ==========

  // Set text color
  color(color: string): ButtonNode {
    return this._updateProps({ color });
  }

  // Set font size
  fontSize(size: number): ButtonNode {
    return this._updateProps({ fontSize: size });
  }

  // Set font weight
  fontWeight(weight: NodeProps['fontWeight']): ButtonNode {
    return this._updateProps({ fontWeight: weight });
  }

  // Set disabled state (button won't respond to clicks)
  disabled(isDisabled: boolean = true): ButtonNode {
    return this._updateProps({ disabled: isDisabled });
  }
}

// Image node - displays images from URLs or local sources
// Alternative: Could use FastImage for better performance and caching
export class ImageNode extends ViewNode<ImageNode> {
  constructor(src: string | { uri: string }) {
    // Convert string to source object if needed
    const source = typeof src === 'string' ? { uri: src } : src;
    super('Image', { src: source }, []);
  }

  // ========== IMAGE-SPECIFIC MODIFIERS ==========

  // Set how image fits in its container
  resizeMode(mode: NodeProps['resizeMode']): ImageNode {
    return this._updateProps({ resizeMode: mode });
  }

  // Set tint color (changes image color)
  tintColor(color: string): ImageNode {
    return this._updateProps({ tintColor: color });
  }

  // Set resize mode to cover (image fills container, may crop)
  cover(): ImageNode {
    return this._updateProps({ resizeMode: 'cover' });
  }

  // Set resize mode to contain (image fits entirely, may have empty space)
  contain(): ImageNode {
    return this._updateProps({ resizeMode: 'contain' });
  }
}

// Input node - text input field for user input
// Alternative: Could use TextInput directly with StyleSheet
export class InputNode extends ViewNode<InputNode> {
  constructor(placeholder?: string) {
    // Initialize with optional placeholder text
    super('Input', { placeholder }, []);
  }

  // ========== INPUT-SPECIFIC MODIFIERS ==========

  // Set text color
  color(color: string): InputNode {
    return this._updateProps({ color });
  }

  // Set font size
  fontSize(size: number): InputNode {
    return this._updateProps({ fontSize: size });
  }

  // Set font weight
  fontWeight(weight: NodeProps['fontWeight']): InputNode {
    return this._updateProps({ fontWeight: weight });
  }

  // Set controlled value (for controlled inputs)
  value(val: string): InputNode {
    return this._updateProps({ value: val });
  }

  // Set default value (for uncontrolled inputs)
  defaultValue(val: string): InputNode {
    return this._updateProps({ defaultValue: val });
  }

  // Set value change handler
  onChange(handler: (value: string) => void): InputNode {
    return this._updateProps({ onChange: handler });
  }

  // Set secure entry (hide text like passwords)
  secure(isSecure: boolean = true): InputNode {
    return this._updateProps({ secureTextEntry: isSecure });
  }

  // Show numeric keyboard
  numeric(): InputNode {
    return this._updateProps({ keyboardType: 'numeric' });
  }

  // Show email keyboard
  email(): InputNode {
    return this._updateProps({ keyboardType: 'email-address' });
  }

  // Show phone keyboard
  phone(): InputNode {
    return this._updateProps({ keyboardType: 'phone-pad' });
  }

  // Enable multi-line input
  multiline(isMultiline: boolean = true): InputNode {
    return this._updateProps({ multiline: isMultiline });
  }

  // Set disabled state (input can't be edited)
  disabled(isDisabled: boolean = true): InputNode {
    return this._updateProps({ disabled: isDisabled });
  }
}

// Spacer node - flexible space filler
// Alternative: Could use View with flex: 1 directly
export class SpacerNode extends ViewNode<SpacerNode> {
  constructor() {
    // Initialize with flex: 1 to take available space
    super('Spacer', { flex: 1 }, []);
  }
}

// Divider node - horizontal line separator
// Alternative: Could use View with height: 1 and background color
export class DividerNode extends ViewNode<DividerNode> {
  constructor() {
    // Initialize with hairline height
    super('Divider', { height: 1 }, []);
  }
}
