// Import style types from React Native for type checking
import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// List of all node types available in the library
// Alternative: Could use enum instead of type union for better IDE autocomplete
export type NodeType = 
  | 'VStack'      // Vertical stack - arranges children in a column
  | 'HStack'      // Horizontal stack - arranges children in a row
  | 'ZStack'      // Layered stack - stacks children on top of each other
  | 'Text'        // Text display component
  | 'Button'      // Clickable button component
  | 'Image'       // Image display component
  | 'Input'       // Text input field component
  | 'ScrollView'  // Scrollable container component
  | 'Spacer'      // Flexible space filler component
  | 'Divider'     // Horizontal line separator component
  | 'SafeArea';   // Safe area aware container component

// Type that can represent any node in the tree
// Alternative: Could use a more specific generic type for better type safety
export type AnyNode = ViewNode<any>;

// Interface defining all possible properties a node can have
// These map directly to React Native style properties and component props
export interface NodeProps {
  // Flex layout properties - control how items grow, shrink, and position
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  
  // Dimension properties - set size of elements
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  
  // Padding properties - space inside element borders
  padding?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  
  // Margin properties - space outside element borders
  margin?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;
  
  // Gap properties - space between flex children
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  
  // Alignment properties - position items within container
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  
  // Appearance properties - visual styling
  backgroundColor?: string;
  opacity?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
  
  // Border properties - element border styling
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderWidth?: number;
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderColor?: string;
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  
  // Shadow properties (iOS) - drop shadow effect
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  
  // Shadow property (Android) - elevation shadow effect
  elevation?: number;
  
  // Position properties - absolute or relative positioning
  position?: 'absolute' | 'relative';
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  zIndex?: number;
  
  // Text style properties - text appearance
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fontFamily?: string;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  textDecorationColor?: string;
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed';
  
  // Image style properties - how images are displayed
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center' | 'repeat';
  tintColor?: string;
  
  // Non-style properties - component-specific props
  text?: string;                      // Text content for Text and Button nodes
  src?: string | { uri: string };     // Image source for Image nodes
  placeholder?: string;              // Placeholder text for Input nodes
  onPress?: () => void;               // Click handler
  onLongPress?: () => void;           // Long press handler
  onChange?: (value: string) => void; // Value change handler
  onChangeText?: (text: string) => void; // Text change handler
  accessibilityLabel?: string;       // Screen reader label
  accessibilityHint?: string;         // Screen reader hint
  testID?: string;                    // Testing identifier
  numberOfLines?: number;            // Max lines for text
  scrollable?: boolean;              // Enable scrolling
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad'; // Keyboard type for input
  secureTextEntry?: boolean;          // Hide text (passwords)
  editable?: boolean;                 // Enable/disable editing
  value?: string;                     // Controlled input value
  defaultValue?: string;              // Default input value
  multiline?: boolean;                // Multi-line input
  disabled?: boolean;                // Disable interaction
}

// Base class for all nodes in the tree
// Uses generic type T to enable method chaining with proper type inference
// Alternative: Could use builder pattern with separate builder classes
export abstract class ViewNode<T extends ViewNode<T>> {
  // Private properties to store node state
  protected _type: NodeType;          // The type of this node
  protected _props: NodeProps = {};   // All style and component props
  protected _children: AnyNode[] = []; // Child nodes

  // Constructor initializes the node with type, props, and children
  constructor(type: NodeType, props: NodeProps = {}, children: AnyNode[] = []) {
    this._type = type;
    this._props = { ...props };
    this._children = [...children];
  }

  // Getter for node type - read-only access
  get type(): NodeType {
    return this._type;
  }

  // Getter for node props - returns a copy to prevent external modification
  get props(): NodeProps {
    return { ...this._props };
  }

  // Getter for node children - returns a copy to prevent external modification
  get children(): AnyNode[] {
    return [...this._children];
  }

  // Helper method to update props and return this for chaining
  // Alternative: Could return new instances for immutability (functional approach)
  protected _updateProps(updates: Partial<NodeProps>): T {
    this._props = { ...this._props, ...updates };
    return this as unknown as T;
  }

  // ========== LAYOUT MODIFIERS ==========
  
  // Set flex value - controls how much space element takes
  flex(value: number): T {
    return this._updateProps({ flex: value });
  }

  // Set width - can be number (pixels) or string (percentage)
  width(value: number | string): T {
    return this._updateProps({ width: value });
  }

  // Set height - can be number (pixels) or string (percentage)
  height(value: number | string): T {
    return this._updateProps({ height: value });
  }

  // Set minimum width - element won't shrink below this
  minWidth(value: number | string): T {
    return this._updateProps({ minWidth: value });
  }

  // Set maximum width - element won't grow beyond this
  maxWidth(value: number | string): T {
    return this._updateProps({ maxWidth: value });
  }

  // Set minimum height - element won't shrink below this
  minHeight(value: number | string): T {
    return this._updateProps({ minHeight: value });
  }

  // Set maximum height - element won't grow beyond this
  maxHeight(value: number | string): T {
    return this._updateProps({ maxHeight: value });
  }

  // Set width to 100% of parent
  fullWidth(): T {
    return this._updateProps({ width: '100%' });
  }

  // Set height to 100% of parent
  fullHeight(): T {
    return this._updateProps({ height: '100%' });
  }

  // Fill entire parent with flex: 1 and 100% width/height
  fill(): T {
    return this._updateProps({ flex: 1, width: '100%', height: '100%' });
  }

  // ========== PADDING MODIFIERS ==========
  
  // Set all padding at once
  padding(value: number | string): T {
    return this._updateProps({ padding: value });
  }

  // Set top padding only
  paddingTop(value: number | string): T {
    return this._updateProps({ paddingTop: value });
  }

  // Set bottom padding only
  paddingBottom(value: number | string): T {
    return this._updateProps({ paddingBottom: value });
  }

  // Set left padding only
  paddingLeft(value: number | string): T {
    return this._updateProps({ paddingLeft: value });
  }

  // Set right padding only
  paddingRight(value: number | string): T {
    return this._updateProps({ paddingRight: value });
  }

  // Set left and right padding
  paddingHorizontal(value: number | string): T {
    return this._updateProps({ paddingHorizontal: value });
  }

  // Set top and bottom padding
  paddingVertical(value: number | string): T {
    return this._updateProps({ paddingVertical: value });
  }

  // Shortcut for paddingHorizontal
  px(value: number | string): T {
    return this.paddingHorizontal(value);
  }

  // Shortcut for paddingVertical
  py(value: number | string): T {
    return this.paddingVertical(value);
  }

  // ========== MARGIN MODIFIERS ==========
  
  // Set all margin at once
  margin(value: number | string): T {
    return this._updateProps({ margin: value });
  }

  // Set top margin only
  marginTop(value: number | string): T {
    return this._updateProps({ marginTop: value });
  }

  // Set bottom margin only
  marginBottom(value: number | string): T {
    return this._updateProps({ marginBottom: value });
  }

  // Set left margin only
  marginLeft(value: number | string): T {
    return this._updateProps({ marginLeft: value });
  }

  // Set right margin only
  marginRight(value: number | string): T {
    return this._updateProps({ marginRight: value });
  }

  // Set left and right margin
  marginHorizontal(value: number | string): T {
    return this._updateProps({ marginHorizontal: value });
  }

  // Set top and bottom margin
  marginVertical(value: number | string): T {
    return this._updateProps({ marginVertical: value });
  }

  // Shortcut for marginHorizontal
  mx(value: number | string): T {
    return this.marginHorizontal(value);
  }

  // Shortcut for marginVertical
  my(value: number | string): T {
    return this.marginVertical(value);
  }

  // ========== ALIGNMENT MODIFIERS ==========
  
  // Set how children align along cross axis
  align(value: NodeProps['alignItems']): T {
    return this._updateProps({ alignItems: value });
  }

  // Set how this element aligns itself
  alignSelf(value: NodeProps['alignSelf']): T {
    return this._updateProps({ alignSelf: value });
  }

  // Set how children distribute along main axis
  justify(value: NodeProps['justifyContent']): T {
    return this._updateProps({ justifyContent: value });
  }

  // Center children both horizontally and vertically
  center(): T {
    return this._updateProps({ alignItems: 'center', justifyContent: 'center' });
  }

  // Center children horizontally
  centerX(): T {
    return this._updateProps({ alignItems: 'center' });
  }

  // Center children vertically
  centerY(): T {
    return this._updateProps({ justifyContent: 'center' });
  }

  // Set space between flex children
  gap(value: number | string): T {
    return this._updateProps({ gap: value });
  }

  // Set row gap for flex layouts
  rowGap(value: number | string): T {
    return this._updateProps({ rowGap: value });
  }

  // Set column gap for flex layouts
  columnGap(value: number | string): T {
    return this._updateProps({ columnGap: value });
  }

  // ========== APPEARANCE MODIFIERS ==========
  
  // Set background color
  background(color: string): T {
    return this._updateProps({ backgroundColor: color });
  }

  // Shortcut for background
  bg(color: string): T {
    return this.background(color);
  }

  // Set opacity (0 = transparent, 1 = opaque)
  opacity(value: number): T {
    return this._updateProps({ opacity: value });
  }

  // Set how overflowing content is handled
  overflow(value: NodeProps['overflow']): T {
    return this._updateProps({ overflow: value });
  }

  // ========== BORDER MODIFIERS ==========
  
  // Set border radius (rounded corners)
  borderRadius(value: number): T {
    return this._updateProps({ borderRadius: value });
  }

  // Shortcut for borderRadius
  rounded(value: number): T {
    return this.borderRadius(value);
  }

  // Make fully rounded (pill shape)
  roundedFull(): T {
    return this._updateProps({ borderRadius: 9999 });
  }

  // Set border width and optionally color
  border(value: number | string, color?: string): T {
    const updates: Partial<NodeProps> = { borderWidth: typeof value === 'number' ? value : 1 };
    if (color) {
      updates.borderColor = color;
    }
    return this._updateProps(updates);
  }

  // Set border color
  borderColor(color: string): T {
    return this._updateProps({ borderColor: color });
  }

  // Set border width
  borderWidth(value: number): T {
    return this._updateProps({ borderWidth: value });
  }

  // ========== SHADOW MODIFIERS ==========
  
  // Set shadow properties (iOS) - all parameters optional
  shadow(color?: string, opacity?: number, radius?: number, offset?: { width: number; height: number }): T {
    const updates: Partial<NodeProps> = {};
    if (color !== undefined) updates.shadowColor = color;
    if (opacity !== undefined) updates.shadowOpacity = opacity;
    if (radius !== undefined) updates.shadowRadius = radius;
    if (offset !== undefined) updates.shadowOffset = offset;
    return this._updateProps(updates);
  }

  // Set elevation shadow (Android)
  elevation(value: number): T {
    return this._updateProps({ elevation: value });
  }

  // ========== POSITION MODIFIERS ==========
  
  // Set position type
  position(value: NodeProps['position']): T {
    return this._updateProps({ position: value });
  }

  // Set to absolute positioning
  absolute(): T {
    return this.position('absolute');
  }

  // Set to relative positioning
  relative(): T {
    return this.position('relative');
  }

  // Set distance from top
  top(value: number | string): T {
    return this._updateProps({ top: value });
  }

  // Set distance from bottom
  bottom(value: number | string): T {
    return this._updateProps({ bottom: value });
  }

  // Set distance from left
  left(value: number | string): T {
    return this._updateProps({ left: value });
  }

  // Set distance from right
  right(value: number | string): T {
    return this._updateProps({ right: value });
  }

  // Set z-index (stacking order)
  zIndex(value: number): T {
    return this._updateProps({ zIndex: value });
  }

  // ========== EVENT MODIFIERS ==========
  
  // Set click handler
  onPress(handler: () => void): T {
    return this._updateProps({ onPress: handler });
  }

  // Set long press handler
  onLongPress(handler: () => void): T {
    return this._updateProps({ onLongPress: handler });
  }

  // ========== ACCESSIBILITY MODIFIERS ==========
  
  // Set accessibility label for screen readers
  accessibilityLabel(label: string): T {
    return this._updateProps({ accessibilityLabel: label });
  }

  // Set accessibility hint for screen readers
  accessibilityHint(hint: string): T {
    return this._updateProps({ accessibilityHint: hint });
  }

  // Set test ID for testing
  testID(id: string): T {
    return this._updateProps({ testID: id });
  }

  // ========== CHILDREN MODIFIER ==========
  
  // Replace all children with new ones
  // Alternative: Could have methods like addChild(), removeChild(), insertChild()
  withChildren(...nodes: AnyNode[]): T {
    this._children = [...nodes];
    return this as unknown as T;
  }

  // Convert node props to React Native style object
  // This is called by the renderer to apply styles to actual React Native components
  toRNStyle(): StyleProp<ViewStyle | TextStyle | ImageStyle> {
    const style: any = {};
    const props = this._props;

    // Map flex layout properties
    if (props.flex !== undefined) style.flex = props.flex;
    if (props.flexDirection !== undefined) style.flexDirection = props.flexDirection;
    if (props.flexWrap !== undefined) style.flexWrap = props.flexWrap;
    if (props.flexGrow !== undefined) style.flexGrow = props.flexGrow;
    if (props.flexShrink !== undefined) style.flexShrink = props.flexShrink;
    if (props.flexBasis !== undefined) style.flexBasis = props.flexBasis;

    // Map dimension properties
    if (props.width !== undefined) style.width = props.width;
    if (props.height !== undefined) style.height = props.height;
    if (props.minWidth !== undefined) style.minWidth = props.minWidth;
    if (props.maxWidth !== undefined) style.maxWidth = props.maxWidth;
    if (props.minHeight !== undefined) style.minHeight = props.minHeight;
    if (props.maxHeight !== undefined) style.maxHeight = props.maxHeight;

    // Map padding properties
    if (props.padding !== undefined) style.padding = props.padding;
    if (props.paddingTop !== undefined) style.paddingTop = props.paddingTop;
    if (props.paddingBottom !== undefined) style.paddingBottom = props.paddingBottom;
    if (props.paddingLeft !== undefined) style.paddingLeft = props.paddingLeft;
    if (props.paddingRight !== undefined) style.paddingRight = props.paddingRight;
    if (props.paddingHorizontal !== undefined) style.paddingHorizontal = props.paddingHorizontal;
    if (props.paddingVertical !== undefined) style.paddingVertical = props.paddingVertical;

    // Map margin properties
    if (props.margin !== undefined) style.margin = props.margin;
    if (props.marginTop !== undefined) style.marginTop = props.marginTop;
    if (props.marginBottom !== undefined) style.marginBottom = props.marginBottom;
    if (props.marginLeft !== undefined) style.marginLeft = props.marginLeft;
    if (props.marginRight !== undefined) style.marginRight = props.marginRight;
    if (props.marginHorizontal !== undefined) style.marginHorizontal = props.marginHorizontal;
    if (props.marginVertical !== undefined) style.marginVertical = props.marginVertical;

    // Map gap properties
    if (props.gap !== undefined) style.gap = props.gap;
    if (props.rowGap !== undefined) style.rowGap = props.rowGap;
    if (props.columnGap !== undefined) style.columnGap = props.columnGap;

    // Map alignment properties
    if (props.alignItems !== undefined) style.alignItems = props.alignItems;
    if (props.alignSelf !== undefined) style.alignSelf = props.alignSelf;
    if (props.justifyContent !== undefined) style.justifyContent = props.justifyContent;

    // Map appearance properties
    if (props.backgroundColor !== undefined) style.backgroundColor = props.backgroundColor;
    if (props.opacity !== undefined) style.opacity = props.opacity;
    if (props.overflow !== undefined) style.overflow = props.overflow;

    // Map border properties
    if (props.borderRadius !== undefined) style.borderRadius = props.borderRadius;
    if (props.borderTopLeftRadius !== undefined) style.borderTopLeftRadius = props.borderTopLeftRadius;
    if (props.borderTopRightRadius !== undefined) style.borderTopRightRadius = props.borderTopRightRadius;
    if (props.borderBottomLeftRadius !== undefined) style.borderBottomLeftRadius = props.borderBottomLeftRadius;
    if (props.borderBottomRightRadius !== undefined) style.borderBottomRightRadius = props.borderBottomRightRadius;
    if (props.borderWidth !== undefined) style.borderWidth = props.borderWidth;
    if (props.borderTopWidth !== undefined) style.borderTopWidth = props.borderTopWidth;
    if (props.borderBottomWidth !== undefined) style.borderBottomWidth = props.borderBottomWidth;
    if (props.borderLeftWidth !== undefined) style.borderLeftWidth = props.borderLeftWidth;
    if (props.borderRightWidth !== undefined) style.borderRightWidth = props.borderRightWidth;
    if (props.borderColor !== undefined) style.borderColor = props.borderColor;
    if (props.borderTopColor !== undefined) style.borderTopColor = props.borderTopColor;
    if (props.borderBottomColor !== undefined) style.borderBottomColor = props.borderBottomColor;
    if (props.borderLeftColor !== undefined) style.borderLeftColor = props.borderLeftColor;
    if (props.borderRightColor !== undefined) style.borderRightColor = props.borderRightColor;
    if (props.borderStyle !== undefined) style.borderStyle = props.borderStyle;

    // Map shadow properties (iOS)
    if (props.shadowColor !== undefined) style.shadowColor = props.shadowColor;
    if (props.shadowOffset !== undefined) style.shadowOffset = props.shadowOffset;
    if (props.shadowOpacity !== undefined) style.shadowOpacity = props.shadowOpacity;
    if (props.shadowRadius !== undefined) style.shadowRadius = props.shadowRadius;

    // Map shadow property (Android)
    if (props.elevation !== undefined) style.elevation = props.elevation;

    // Map position properties
    if (props.position !== undefined) style.position = props.position;
    if (props.top !== undefined) style.top = props.top;
    if (props.bottom !== undefined) style.bottom = props.bottom;
    if (props.left !== undefined) style.left = props.left;
    if (props.right !== undefined) style.right = props.right;
    if (props.zIndex !== undefined) style.zIndex = props.zIndex;

    // Map text style properties
    if (props.color !== undefined) style.color = props.color;
    if (props.fontSize !== undefined) style.fontSize = props.fontSize;
    if (props.fontWeight !== undefined) style.fontWeight = props.fontWeight;
    if (props.fontFamily !== undefined) style.fontFamily = props.fontFamily;
    if (props.lineHeight !== undefined) style.lineHeight = props.lineHeight;
    if (props.letterSpacing !== undefined) style.letterSpacing = props.letterSpacing;
    if (props.textAlign !== undefined) style.textAlign = props.textAlign;
    if (props.textTransform !== undefined) style.textTransform = props.textTransform;
    if (props.textDecorationLine !== undefined) style.textDecorationLine = props.textDecorationLine;
    if (props.textDecorationColor !== undefined) style.textDecorationColor = props.textDecorationColor;
    if (props.textDecorationStyle !== undefined) style.textDecorationStyle = props.textDecorationStyle;

    // Map image style properties
    if (props.resizeMode !== undefined) style.resizeMode = props.resizeMode;
    if (props.tintColor !== undefined) style.tintColor = props.tintColor;

    return style;
  }
}
