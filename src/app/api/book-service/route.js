// src/app/api/book-service/route.js
import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request) {
  try {
    const { serviceName, servicePhoneNumber, userName, userPhoneNumber } = await request.json();

    // Ensure environment variables are loaded
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      throw new Error('Twilio environment variables are not set.');
    }

    const client = twilio(accountSid, authToken);

    // --- Message for the Logged-in User ---
    if (userPhoneNumber) { // Only attempt to send if userPhoneNumber is provided
      const userMessage = `Hi ${userName || 'User'}! Thanks for booking "${serviceName}". Your booking is confirmed! The business will contact you at ${servicePhoneNumber} shortly.`;
      
      await client.messages.create({
        body: userMessage,
        from: twilioPhoneNumber,
        to: userPhoneNumber // This should be the logged-in user's actual phone number
      });
      console.log(`SMS confirmation sent to user (${userPhoneNumber}) for booking: ${serviceName}`);
    } else {
      console.warn("User phone number not provided. Skipping user confirmation SMS.");
    }

    // --- Message for the Business Owner ---
    if (servicePhoneNumber) { // Only attempt to send if servicePhoneNumber is provided
      const businessMessage = `New booking received for "${serviceName}"! User: ${userName || 'A customer'}. User's Contact: ${userPhoneNumber || 'Not provided'}. Please contact them for booking details.`;

      await client.messages.create({
        body: businessMessage,
        from: twilioPhoneNumber,
        to: servicePhoneNumber // This is the business owner's phone number
      });
      console.log(`SMS notification sent to business owner (${servicePhoneNumber}) for booking: ${serviceName}`);
    } else {
        console.warn("Service provider's phone number not provided. Skipping business notification SMS.");
    }


    return NextResponse.json({
      message: 'Booking request processed and SMS messages sent!',
      serviceName,
      servicePhoneNumber,
      userName,
      userPhoneNumber
    }, { status: 200 });

  } catch (error) {
    console.error('Error handling booking request and sending SMS:', error);
    return NextResponse.json(
      { message: 'Failed to process booking or send SMS', error: error.message },
      { status: 500 }
    );
  }
}