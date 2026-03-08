# swiftui-rn

A SwiftUI-inspired fluent API wrapper for React Native. Write readable, declarative, zero-CSS UI code for React Native apps using a chainable modifier syntax.

## Installation

```bash
npm install swiftui-rn
```

**Peer Dependencies:**
- React >= 18.0.0
- React Native >= 0.71.0

## Overview

`swiftui-rn` provides a fluent API for building React Native UIs without writing JSX or StyleSheet objects. Instead, you chain modifiers on node objects that compile to real React Native components.

### Before: Traditional React Native

```tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.button}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
});
```

### After: swiftui-rn

```tsx
import React from 'react';
import { Render, VStack, Button } from 'swiftui-rn';

const MyComponent = () => {
  const buttonNode = Button('Click Me', handlePress)
    .fontSize(16)
    .fontWeight('600')
    .color('#ffffff')
    .paddingVertical(12)
    .paddingHorizontal(24)
    .background('#007AFF')
    .borderRadius(8);

  const containerNode = VStack(buttonNode)
    .flex(1)
    .padding(16)
    .background('#f0f0f0')
    .center();

  return <Render node={containerNode} />;
};
```

## Primitives

| Primitive | Description | Factory Function |
|-----------|-------------|------------------|
| `VStack` | Vertical stack (column layout) | `VStack(...children)` |
| `HStack` | Horizontal stack (row layout) | `HStack(...children)` |
| `ZStack` | Layered stack (positioned children) | `ZStack(...children)` |
| `ScrollView` | Scrollable container | `ScrollView(...children)` |
| `SafeArea` | Safe area aware container | `SafeArea(...children)` |
| `Text` | Text display | `Text(content)` |
| `Button` | Pressable button | `Button(label, onPress?)` |
| `Image` | Image display | `Image(src)` |
| `Input` | Text input field | `Input(placeholder?)` |
| `Spacer` | Flexible space filler | `Spacer()` |
| `Divider` | Horizontal divider line | `Divider()` |

## Modifiers Reference

### Layout Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.flex(n)` | Set flex value | `.flex(1)` |
| `.width(v)` | Set width | `.width(100)` or `.width('100%')` |
| `.height(v)` | Set height | `.height(50)` |
| `.minWidth(v)` | Set minimum width | `.minWidth(100)` |
| `.maxWidth(v)` | Set maximum width | `.maxWidth(300)` |
| `.minHeight(v)` | Set minimum height | `.minHeight(50)` |
| `.maxHeight(v)` | Set maximum height | `.maxHeight(200)` |
| `.fullWidth()` | Set width to 100% | `.fullWidth()` |
| `.fullHeight()` | Set height to 100% | `.fullHeight()` |
| `.fill()` | Fill parent (flex: 1, 100% w/h) | `.fill()` |

### Padding Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.padding(v)` | Set all padding | `.padding(16)` |
| `.paddingTop(v)` | Set top padding | `.paddingTop(8)` |
| `.paddingBottom(v)` | Set bottom padding | `.paddingBottom(8)` |
| `.paddingLeft(v)` | Set left padding | `.paddingLeft(12)` |
| `.paddingRight(v)` | Set right padding | `.paddingRight(12)` |
| `.paddingHorizontal(v)` | Set horizontal padding | `.paddingHorizontal(16)` |
| `.paddingVertical(v)` | Set vertical padding | `.paddingVertical(12)` |
| `.px(v)` | Alias for paddingHorizontal | `.px(16)` |
| `.py(v)` | Alias for paddingVertical | `.py(12)` |

### Margin Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.margin(v)` | Set all margin | `.margin(16)` |
| `.marginTop(v)` | Set top margin | `.marginTop(8)` |
| `.marginBottom(v)` | Set bottom margin | `.marginBottom(8)` |
| `.marginLeft(v)` | Set left margin | `.marginLeft(12)` |
| `.marginRight(v)` | Set right margin | `.marginRight(12)` |
| `.marginHorizontal(v)` | Set horizontal margin | `.marginHorizontal(16)` |
| `.marginVertical(v)` | Set vertical margin | `.marginVertical(12)` |
| `.mx(v)` | Alias for marginHorizontal | `.mx(16)` |
| `.my(v)` | Alias for marginVertical | `.my(12)` |

### Alignment Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.align(v)` | Set alignItems | `.align('center')` |
| `.alignSelf(v)` | Set alignSelf | `.alignSelf('flex-start')` |
| `.justify(v)` | Set justifyContent | `.justify('space-between')` |
| `.center()` | Center both axes | `.center()` |
| `.centerX()` | Center horizontally | `.centerX()` |
| `.centerY()` | Center vertically | `.centerY()` |
| `.gap(v)` | Set gap between children | `.gap(12)` |
| `.rowGap(v)` | Set row gap | `.rowGap(8)` |
| `.columnGap(v)` | Set column gap | `.columnGap(8)` |

### Appearance Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.background(c)` | Set background color | `.background('#007AFF')` |
| `.bg(c)` | Alias for background | `.bg('#007AFF')` |
| `.opacity(v)` | Set opacity (0-1) | `.opacity(0.8)` |
| `.overflow(v)` | Set overflow | `.overflow('hidden')` |

### Border Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.borderRadius(v)` | Set border radius | `.borderRadius(8)` |
| `.rounded(v)` | Alias for borderRadius | `.rounded(12)` |
| `.roundedFull()` | Full rounded (pill) | `.roundedFull()` |
| `.border(w, c?)` | Set border width/color | `.border(1, '#ccc')` |
| `.borderColor(c)` | Set border color | `.borderColor('#007AFF')` |
| `.borderWidth(w)` | Set border width | `.borderWidth(2)` |

### Shadow Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.shadow(c?, o?, r?, off?)` | Set shadow (iOS) | `.shadow('#000', 0.3, 10, {width: 0, height: 4})` |
| `.elevation(v)` | Set elevation (Android) | `.elevation(4)` |

### Position Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.position(v)` | Set position type | `.position('absolute')` |
| `.absolute()` | Set absolute position | `.absolute()` |
| `.relative()` | Set relative position | `.relative()` |
| `.top(v)` | Set top position | `.top(0)` |
| `.bottom(v)` | Set bottom position | `.bottom(0)` |
| `.left(v)` | Set left position | `.left(0)` |
| `.right(v)` | Set right position | `.right(0)` |
| `.zIndex(v)` | Set z-index | `.zIndex(10)` |

### Event Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.onPress(fn)` | Set press handler | `.onPress(() => console.log('pressed'))` |
| `.onLongPress(fn)` | Set long press handler | `.onLongPress(() => console.log('long pressed'))` |

### Accessibility Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.accessibilityLabel(l)` | Set accessibility label | `.accessibilityLabel('Submit button')` |
| `.accessibilityHint(h)` | Set accessibility hint | `.accessibilityHint('Submits the form')` |
| `.testID(id)` | Set test ID | `.testID('submit-button')` |

### Text-Specific Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.color(c)` | Set text color | `.color('#ffffff')` |
| `.fontSize(v)` | Set font size | `.fontSize(16)` |
| `.fontWeight(v)` | Set font weight | `.fontWeight('bold')` |
| `.fontFamily(f)` | Set font family | `.fontFamily('Roboto')` |
| `.lineHeight(v)` | Set line height | `.lineHeight(24)` |
| `.letterSpacing(v)` | Set letter spacing | `.letterSpacing(0.5)` |
| `.textAlign(v)` | Set text alignment | `.textAlign('center')` |
| `.uppercase()` | Uppercase text | `.uppercase()` |
| `.lowercase()` | Lowercase text | `.lowercase()` |
| `.capitalize()` | Capitalize text | `.capitalize()` |
| `.underline()` | Underline text | `.underline()` |
| `.strikethrough()` | Strikethrough text | `.strikethrough()` |
| `.numberOfLines(n)` | Set max lines | `.numberOfLines(2)` |

#### Text Presets

| Modifier | Description |
|----------|-------------|
| `.bold()` | Bold font weight |
| `.semibold()` | Semibold font weight (600) |
| `.thin()` | Thin font weight (300) |
| `.small()` | Small font size (12) |
| `.body()` | Body font size (14) |
| `.title()` | Title style (18, 600) |
| `.headline()` | Headline style (24, bold) |
| `.caption()` | Caption style (11, 0.7 opacity) |
| `.muted()` | Muted opacity (0.6) |

### Button-Specific Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.color(c)` | Set text color | `.color('#ffffff')` |
| `.fontSize(v)` | Set font size | `.fontSize(16)` |
| `.fontWeight(v)` | Set font weight | `.fontWeight('600')` |
| `.disabled(v?)` | Set disabled state | `.disabled(true)` |

### Image-Specific Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.resizeMode(v)` | Set resize mode | `.resizeMode('cover')` |
| `.tintColor(c)` | Set tint color | `.tintColor('#007AFF')` |
| `.cover()` | Set cover resize mode | `.cover()` |
| `.contain()` | Set contain resize mode | `.contain()` |

### Input-Specific Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.color(c)` | Set text color | `.color('#000000')` |
| `.fontSize(v)` | Set font size | `.fontSize(16)` |
| `.value(v)` | Set controlled value | `.value(text)` |
| `.defaultValue(v)` | Set default value | `.defaultValue('Enter text')` |
| `.onChange(fn)` | Set change handler | `.onChange((v) => setValue(v))` |
| `.secure(v?)` | Set secure entry | `.secure(true)` |
| `.numeric()` | Numeric keyboard | `.numeric()` |
| `.email()` | Email keyboard | `.email()` |
| `.phone()` | Phone keyboard | `.phone()` |
| `.multiline(v?)` | Set multiline | `.multiline(true)` |
| `.disabled(v?)` | Set disabled state | `.disabled(true)` |

### ScrollView-Specific Modifiers

| Modifier | Description | Example |
|----------|-------------|---------|
| `.horizontal()` | Enable horizontal scrolling | `.horizontal()` |

## Rendering

To render a node tree, use the [`<Render>`](src/renderer.tsx:19) component:

```tsx
import React from 'react';
import { Render, VStack, Text } from 'swiftui-rn';

const MyScreen = () => {
  const node = VStack(
    Text('Hello World')
      .fontSize(24)
      .color('#000000')
  )
    .padding(16)
    .center();

  return <Render node={node} />;
};
```

### Performance Tip

Use [`useMemo()`](examples/SendScreen.tsx:14) to wrap your node tree when it depends on state or props:

```tsx
import React, { useState, useMemo } from 'react';
import { Render, VStack, Text, Input } from 'swiftui-rn';

const MyScreen = () => {
  const [text, setText] = useState('');

  const node = useMemo(() => {
    return VStack(
      Text(text)
        .fontSize(24)
        .color('#000000'),
      Input('Enter text')
        .onChange(setText)
    )
      .padding(16)
      .center();
  }, [text]); // Rebuild when text changes

  return <Render node={node} />;
};
```

## Design Tokens Pattern

Create reusable design tokens for consistent styling:

```tsx
// tokens.ts
import { ViewNode } from 'swiftui-rn';

export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

// Usage
import { colors, spacing, borderRadius, fontSize } from './tokens';

const button = Button('Click Me', handleClick)
  .background(colors.primary)
  .color(colors.surface)
  .fontSize(fontSize.md)
  .paddingHorizontal(spacing.lg)
  .paddingVertical(spacing.md)
  .borderRadius(borderRadius.md);
```

## Reusable Components Pattern

Create reusable component functions:

```tsx
// components.ts
import { Button as BaseButton } from 'swiftui-rn';
import { colors, spacing, borderRadius, fontSize } from './tokens';

export const PrimaryButton = (label: string, onPress: () => void) => {
  return BaseButton(label, onPress)
    .background(colors.primary)
    .color(colors.surface)
    .fontSize(fontSize.md)
    .fontWeight('600')
    .paddingHorizontal(spacing.lg)
    .paddingVertical(spacing.md)
    .borderRadius(borderRadius.md);
};

export const SecondaryButton = (label: string, onPress: () => void) => {
  return BaseButton(label, onPress)
    .background(colors.surface)
    .color(colors.primary)
    .fontSize(fontSize.md)
    .fontWeight('600')
    .paddingHorizontal(spacing.lg)
    .paddingVertical(spacing.md)
    .borderRadius(borderRadius.md)
    .borderWidth(1)
    .borderColor(colors.primary);
};

export const Card = (...children: any[]) => {
  return VStack(...children)
    .background(colors.surface)
    .padding(spacing.md)
    .borderRadius(borderRadius.lg)
    .shadow('#000', 0.1, 8, { width: 0, height: 2 });
};

// Usage
import { PrimaryButton, SecondaryButton, Card } from './components';

const MyScreen = () => {
  return VStack(
    Card(
      Text('Card Title').title().paddingBottom(spacing.sm),
      Text('Card content goes here...').body(),
    ),
    VStack(
      PrimaryButton('Primary Action', () => {}),
      SecondaryButton('Secondary Action', () => {}),
    )
      .gap(spacing.md)
      .padding(spacing.md),
  );
};
```

## Full Example

See [`examples/SendScreen.tsx`](examples/SendScreen.tsx:1) for a complete production-quality fintech send screen example.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
