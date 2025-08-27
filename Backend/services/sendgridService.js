const sgMail = require('@sendgrid/mail');

// Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send ride confirmation email to user
 * @param {Object} rideData - Ride details
 * @param {Object} userData - User details
 * @param {Object} driverData - Driver details
 */
async function sendRideConfirmationEmail(rideData, userData, driverData) {
  try {
    const { dropLocation, date, time, numberOfPeople, fare } = rideData;
    const { name: userName, email: userEmail } = userData;
    const { driverName, driverPhone, cabNumber } = driverData;

    const totalFare = fare * numberOfPeople;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const msg = {
      to: userEmail,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@campuscabs.com',
      subject: '🚗 Ride Confirmed! Your CampusCabs Journey',
      text: `
Ride Confirmation - CampusCabs

Hello ${userName},

Your ride has been successfully confirmed! Here are the details:

📍 Destination: ${dropLocation}
📅 Date: ${formattedDate}
🕑 Pickup Time: ${time}
👥 Passengers: ${numberOfPeople}
💸 Total Fare: Rs ${totalFare}/-

🚖 Driver Details:
   Name: ${driverName}
   Phone: ${driverPhone}
   Cab Number: ${cabNumber}

Please be ready at your pickup location 5 minutes before the scheduled time.

For any queries, contact us at support@campuscabs.com

Thank you for choosing CampusCabs!
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #f59e0b; margin: 0; font-size: 28px;">🚗 CampusCabs</h1>
              <h2 style="color: #1f2937; margin: 10px 0 0 0; font-size: 24px;">Ride Confirmed!</h2>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <p style="margin: 0 0 15px 0; font-size: 16px; color: #374151;">Hello <strong>${userName}</strong>,</p>
              <p style="margin: 0; font-size: 16px; color: #374151;">Your ride has been successfully confirmed! Here are the details:</p>
            </div>
            
            <div style="background-color: #ffffff; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">📍 Ride Details</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <p style="margin: 5px 0; color: #6b7280;"><strong>Destination:</strong></p>
                  <p style="margin: 5px 0; color: #1f2937;">${dropLocation}</p>
                </div>
                <div>
                  <p style="margin: 5px 0; color: #6b7280;"><strong>Date:</strong></p>
                  <p style="margin: 5px 0; color: #1f2937;">${formattedDate}</p>
                </div>
                <div>
                  <p style="margin: 5px 0; color: #6b7280;"><strong>Pickup Time:</strong></p>
                  <p style="margin: 5px 0; color: #1f2937;">${time}</p>
                </div>
                <div>
                  <p style="margin: 5px 0; color: #6b7280;"><strong>Passengers:</strong></p>
                  <p style="margin: 5px 0; color: #1f2937;">${numberOfPeople}</p>
                </div>
              </div>
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 5px 0; color: #6b7280;"><strong>Total Fare:</strong></p>
                <p style="margin: 5px 0; color: #059669; font-size: 20px; font-weight: bold;">Rs ${totalFare}/-</p>
              </div>
            </div>
            
            <div style="background-color: #eff6ff; border: 2px solid #dbeafe; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
              <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">🚖 Driver Details</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <p style="margin: 5px 0; color: #6b7280;"><strong>Name:</strong></p>
                  <p style="margin: 5px 0; color: #1f2937;">${driverName}</p>
                </div>
                <div>
                  <p style="margin: 5px 0; color: #6b7280;"><strong>Phone:</strong></p>
                  <p style="margin: 5px 0; color: #1f2937;">${driverPhone}</p>
                </div>
                <div>
                  <p style="margin: 5px 0; color: #6b7280;"><strong>Cab Number:</strong></p>
                  <p style="margin: 5px 0; color: #1f2937;">${cabNumber}</p>
                </div>
              </div>
            </div>
            
            <div style="background-color: #fef3c7; border: 2px solid #fde68a; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
              <p style="margin: 0; color: #92400e; font-size: 14px; text-align: center;">
                ⏰ <strong>Please be ready at your pickup location 5 minutes before the scheduled time.</strong>
              </p>
            </div>
            
            <div style="text-align: center; color: #6b7280; font-size: 14px;">
              <p style="margin: 5px 0;">For any queries, contact us at <a href="mailto:support@campuscabs.com" style="color: #f59e0b;">support@campuscabs.com</a></p>
              <p style="margin: 5px 0;">Thank you for choosing CampusCabs! 🚗✨</p>
            </div>
          </div>
        </div>
      `
    };

    const result = await sgMail.send(msg);
    console.log('Ride confirmation email sent successfully to:', userEmail);
    return { success: true, messageId: result[0].headers['x-message-id'] };

  } catch (error) {
    console.error('Error sending ride confirmation email:', error);
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
    throw error;
  }
}

module.exports = {
  sendRideConfirmationEmail
}; 