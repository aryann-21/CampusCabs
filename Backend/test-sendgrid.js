require('dotenv').config();
const { sendRideConfirmationEmail } = require('./services/sendgridService');

async function testSendGrid() {
  try {
    console.log('Testing SendGrid integration...');
    console.log('API Key:', process.env.SENDGRID_API_KEY ? '✅ Set' : '❌ Missing');
    console.log('From Email:', process.env.SENDGRID_FROM_EMAIL || '❌ Missing - using default');

    // Test data
    const rideData = {
      dropLocation: 'Airport Terminal 1',
      date: '2024-01-15',
      time: '14:30',
      numberOfPeople: 2,
      fare: 500
    };

    const userData = {
      name: 'Test User',
      email: 'your-test-email@example.com' // Replace with your email for testing
    };

    const driverData = {
      driverName: 'John Driver',
      driverPhone: '+91-9876543210',
      cabNumber: 'DL-01-AB-1234'
    };

    console.log('\nSending test email...');
    const result = await sendRideConfirmationEmail(rideData, userData, driverData);

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);

  } catch (error) {
    console.error('❌ Error testing SendGrid:', error.message);
    if (error.response) {
      console.error('SendGrid API Error:', error.response.body);
    }
  }
}

// Run the test
testSendGrid(); 