// Import React for creating components
import React from 'react';
// Import React Native components
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageSourcePropType,
} from 'react-native';
// Import types from our types file
import { AnyNode, NodeProps } from './types';

// Props interface for the Render component
interface RenderProps {
  node: AnyNode; // The node tree to render
}

// Render component - converts node tree to actual React Native components
// This is the main component that developers use to display their UI
export const Render: React.FC<RenderProps> = ({ node }: RenderProps) => {
  // Convert node props to React Native style object
  const style = node.toRNStyle();
  // Get all props from the node
  const props = node.props;

  // Helper function to render all child nodes recursively
  // Alternative: Could use React.Children.map for better performance
  const renderChildren = () => {
    return node.children.map((child: AnyNode, index: number) => (
      <Render key={index} node={child} />
    ));
  };

  // Handle press events - only call if not disabled
  const handlePress = () => {
    if (props.onPress && !props.disabled) {
      props.onPress();
    }
  };

  // Handle long press events - only call if not disabled
  const handleLongPress = () => {
    if (props.onLongPress && !props.disabled) {
      props.onLongPress();
    }
  };

  // Switch based on node type to render appropriate React Native component
  switch (node.type) {
    // VStack - render as View with column direction
    case 'VStack': {
      return (
        <View style={[{ flexDirection: 'column' }, style]}>
          {renderChildren()}
        </View>
      );
    }

    // HStack - render as View with row direction and center alignment
    case 'HStack': {
      return (
        <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
          {renderChildren()}
        </View>
      );
    }

    // ZStack - render as View with relative positioning
    case 'ZStack': {
      return (
        <View style={[{ position: 'relative' }, style]}>
          {renderChildren()}
        </View>
      );
    }

    // SafeArea - render as SafeAreaView component
    case 'SafeArea': {
      return (
        <SafeAreaView style={style}>
          {renderChildren()}
        </SafeAreaView>
      );
    }

    // ScrollView - render as ScrollView with optional horizontal scrolling
    case 'ScrollView': {
      const isHorizontal = (node as any).isHorizontal || false;
      return (
        <ScrollView
          horizontal={isHorizontal}
          style={style}
          contentContainerStyle={props.padding || props.paddingHorizontal || props.paddingVertical ? { padding: 0 } : undefined}
        >
          {renderChildren()}
        </ScrollView>
      );
    }

    // Text - render as Text component with text content
    case 'Text': {
      return (
        <Text style={style} numberOfLines={props.numberOfLines}>
          {props.text}
        </Text>
      );
    }

    // Button - render as TouchableOpacity wrapping a Text label
    case 'Button': {
      // Create the button text content
      const content = (
        <Text style={[
          {
            color: props.color || '#ffffff',
            fontSize: props.fontSize || 16,
            fontWeight: props.fontWeight || '600',
          }
        ]}>
          {props.text}
        </Text>
      );

      // If disabled, render as plain View (no interaction)
      if (props.disabled) {
        return (
          <View style={[style, { opacity: 0.5 }]}>
            {content}
          </View>
        );
      }

      // If enabled, render as TouchableOpacity with press handlers
      return (
        <TouchableOpacity
          onPress={handlePress}
          onLongPress={handleLongPress}
          activeOpacity={0.8}
          style={style}
          disabled={props.disabled}
        >
          {content}
        </TouchableOpacity>
      );
    }

    // Image - render as Image component
    case 'Image': {
      // Convert source to proper format for React Native Image component
      let source: ImageSourcePropType;
      if (typeof props.src === 'string') {
        source = { uri: props.src };
      } else {
        source = props.src as ImageSourcePropType;
      }

      // Create the image component
      const imageContent = (
        <Image
          source={source}
          style={style as any}
          resizeMode={props.resizeMode}
          tintColor={props.tintColor}
        />
      );

      // If has press handler, wrap in TouchableOpacity
      if (props.onPress && !props.disabled) {
        return (
          <TouchableOpacity
            onPress={handlePress}
            onLongPress={handleLongPress}
            activeOpacity={0.8}
            disabled={props.disabled}
          >
            {imageContent}
          </TouchableOpacity>
        );
      }

      // Otherwise, render image directly
      return imageContent;
    }

    // Input - render as TextInput component
    case 'Input': {
      return (
        <TextInput
          style={style}
          placeholder={props.placeholder}
          value={props.value}
          defaultValue={props.defaultValue}
          onChangeText={(text: string) => {
            // Call both onChangeText and onChange if they exist
            if (props.onChangeText) {
              props.onChangeText(text);
            }
            if (props.onChange) {
              props.onChange(text);
            }
          }}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          editable={!props.disabled}
          multiline={props.multiline}
          numberOfLines={props.numberOfLines}
          placeholderTextColor={props.opacity !== undefined ? `rgba(128, 128, 128, ${props.opacity})` : '#808080'}
        />
      );
    }

    // Spacer - render as View with flex: 1
    case 'Spacer': {
      return <View style={{ flex: 1 }} />;
    }

    // Divider - render as thin horizontal line
    case 'Divider': {
      return (
        <View
          style={[
            style,
            {
              height: StyleSheet.hairlineWidth, // Very thin line
              backgroundColor: props.borderColor || '#e5e7eb',
            },
          ]}
        />
      );
    }

    // Default case - render as View with children
    default: {
      return <View style={style}>{renderChildren()}</View>;
    }
  }
};
