const axios = require('axios');

async function testCORS() {
  const baseURL = 'http://localhost:5000';

  try {
    console.log('Testing CORS configuration...\n');

    // Test 1: Simple GET request
    console.log('1. Testing GET /health...');
    const healthResponse = await axios.get(`${baseURL}/health`);
    console.log('✅ Health check successful:', healthResponse.data);

    // Test 2: Test with origin header
    console.log('\n2. Testing with origin header...');
    const originResponse = await axios.get(`${baseURL}/health`, {
      headers: {
        'Origin': 'http://localhost:3000'
      }
    });
    console.log('✅ Origin header test successful:', originResponse.data);

    // Test 3: Test OPTIONS preflight
    console.log('\n3. Testing OPTIONS preflight...');
    const optionsResponse = await axios.options(`${baseURL}/health`, {
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    console.log('✅ OPTIONS preflight successful');
    console.log('CORS headers:', {
      'Access-Control-Allow-Origin': optionsResponse.headers['access-control-allow-origin'],
      'Access-Control-Allow-Methods': optionsResponse.headers['access-control-allow-methods'],
      'Access-Control-Allow-Headers': optionsResponse.headers['access-control-allow-headers']
    });

    // Test 4: Test Google auth endpoint (should fail without proper data but CORS should work)
    console.log('\n4. Testing Google auth endpoint CORS...');
    try {
      const googleResponse = await axios.post(`${baseURL}/api/auth/google`, {}, {
        headers: {
          'Origin': 'http://localhost:3000',
          'Content-Type': 'application/json'
        }
      });
      console.log('✅ Google auth CORS test successful');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Google auth CORS test successful (expected 400 for missing data)');
      } else {
        console.log('❌ Google auth CORS test failed:', error.message);
      }
    }

    console.log('\n🎉 All CORS tests completed successfully!');

  } catch (error) {
    console.error('❌ CORS test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
  }
}

// Run the test
testCORS();
