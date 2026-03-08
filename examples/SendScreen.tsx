// Import React hooks for state management and memoization
import React, { useState, useMemo } from 'react';
// Import all swiftui-rn components and types
import { Render, VStack, HStack, Text, Button, Input, Image, Spacer, Divider, SafeArea } from '../src';

// SendScreen component - a fintech send money screen using swiftui-rn
// Alternative: Could use traditional JSX with StyleSheet
const SendScreen: React.FC = () => {
  // State for amount input
  const [amount, setAmount] = useState('');
  
  // State for recipient information
  const [recipientName, setRecipientName] = useState('Kwame Mensah');
  const [recipientPhone, setRecipientPhone] = useState('+233 24 123 4567');
  const [network, setNetwork] = useState('MTN Mobile Money');

  // Conversion rate: 1 GHS = 0.065 USD
  // Alternative: Could fetch this from an API
  const ghsToUsdRate = 0.065;
  
  // Calculate USD equivalent - memoized to recalculate only when amount changes
  const usdAmount = useMemo(() => {
    const ghs = parseFloat(amount) || 0;
    return (ghs * ghsToUsdRate).toFixed(2);
  }, [amount]);

  // Build the UI node tree using useMemo for performance
  // This prevents rebuilding the entire tree on every render
  // Alternative: Could build the tree without useMemo, but less efficient
  const screenNode = useMemo(() => {
    return SafeArea(
      VStack(
        // ========== HEADER SECTION ==========
        // Contains back button, title, and spacer for balance
        HStack(
          // Back button - simple arrow with click handler
          Button('←', () => console.log('Back pressed'))
            .fontSize(24)
            .color('#16a34a')
            .padding(8),
          Spacer(), // Pushes title to center
          Text('Send Money')
            .title()
            .color('#ffffff'),
          Spacer(), // Spacer for balance on right side
        )
          .paddingHorizontal(16)
          .paddingVertical(12)
          .background('#0f172a'),

        Divider(), // Horizontal separator

        // ========== MAIN CONTENT SECTION ==========
        VStack(
          // ========== AMOUNT INPUT SECTION ==========
          VStack(
            Text('Enter Amount')
              .body()
              .color('#94a3b8')
              .paddingBottom(8),
            HStack(
              Text('GHS')
                .headline()
                .color('#16a34a')
                .paddingRight(8),
              Input(amount)
                .value(amount)
                .onChange(setAmount)
                .fontSize(32)
                .fontWeight('bold')
                .color('#ffffff')
                .numeric()
                .padding(0)
                .flex(1),
            )
              .paddingVertical(16)
              .paddingHorizontal(20)
              .background('#1e293b')
              .borderRadius(12)
              .borderWidth(1)
              .borderColor('#334155'),
            Text(`≈ $${usdAmount} USD`)
              .caption()
              .color('#64748b')
              .paddingTop(8)
              .textAlign('center'),
          )
            .padding(16)
            .width('100%'),

          // ========== RECIPIENT CARD SECTION ==========
          VStack(
            Text('Recipient')
              .body()
              .color('#94a3b8')
              .paddingBottom(12)
              .paddingLeft(4),
            HStack(
              // Recipient avatar - generated from name
              Image('https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame')
                .width(48)
                .height(48)
                .borderRadius(24)
                .borderWidth(2)
                .borderColor('#16a34a'),
              VStack(
                Text(recipientName)
                  .body()
                  .color('#ffffff')
                  .fontWeight('600'),
                Text(recipientPhone)
                  .caption()
                  .color('#64748b'),
              )
                .align('flex-start')
                .paddingLeft(12)
                .flex(1),
              // Change recipient button
              Button('Change', () => console.log('Change recipient'))
                .fontSize(12)
                .color('#16a34a')
                .paddingHorizontal(12)
                .paddingVertical(6)
                .borderRadius(8)
                .borderWidth(1)
                .borderColor('#16a34a')
                .background('transparent'),
            )
              .padding(16)
              .background('#1e293b')
              .borderRadius(12)
              .borderWidth(1)
              .borderColor('#334155'),
          )
            .padding(16)
            .width('100%'),

          // ========== NETWORK INFO SECTION ==========
          HStack(
            VStack(
              Text('Network')
                .caption()
                .color('#64748b'),
              Text(network)
                .body()
                .color('#ffffff')
                .fontWeight('500'),
            )
              .align('flex-start')
              .flex(1),
            // Network logo
            Image('https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/MTN_Logo_2016.svg/1200px-MTN_Logo_2016.svg.png')
              .width(40)
              .height(40)
              .contain(),
          )
            .padding(16)
            .background('#1e293b')
            .borderRadius(12)
            .borderWidth(1)
            .borderColor('#334155')
            .marginHorizontal(16),

          Spacer(), // Pushes button and footer to bottom

          // ========== SEND BUTTON SECTION ==========
          Button('Send GHS ' + (amount || '0.00'), () => {
            console.log('Send pressed:', { amount, recipientName, recipientPhone, network });
            alert(`Sending GHS ${amount} to ${recipientName}`);
          })
            .fontSize(16)
            .fontWeight('600')
            .color('#ffffff')
            .background('#16a34a')
            .paddingVertical(16)
            .borderRadius(12)
            .marginHorizontal(16)
            .marginBottom(8)
            .disabled(!amount || parseFloat(amount) <= 0), // Disable if no amount

          // ========== FOOTER CAPTION SECTION ==========
          Text('Transaction fee: GHS 1.00 • Instant transfer')
            .caption()
            .color('#64748b')
            .textAlign('center')
            .paddingBottom(16),
        )
          .flex(1)
          .paddingTop(16)
          .background('#0f172a'),
      )
        .fill()
        .background('#0f172a'),
    );
  }, [amount, recipientName, recipientPhone, network, usdAmount]); // Rebuild when these values change

  // Render the node tree using the Render component
  // Alternative: Could use a custom renderer for different platforms
  return <Render node={screenNode} />;
};

// Export the component for use in other files
export default SendScreen;
