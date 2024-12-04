// Sample user data array with userId
const users = [
    {
      userId: '1', // Added userId
      email: 'vaibhav.s@indiainfotech.com',
      password: 'Vaibhav@321',
      otp: '5353'
    },
    // You can add more users here
    {
      userId: '2', // Added userId
      email: 'john.doe@example.com',
      password: 'JohnDoe123!',
      otp: '1234'
    },
    {
      userId: '3', // Added userId
      email: 'jane.smith@example.com',
      password: 'JaneSmith2024!',
      otp: '5678'
    }
];

// Simulate an API call to validate login credentials
export const loginAPI = async (email, password) => {
    // Simulating an API delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find((user) => user.email === email && user.password === password);
            if (user) {
                resolve({ success: true, userId: user.userId }); // Returning userId along with success
            } else {
                reject('Invalid email or password'); // Invalid credentials
            }
        }, 1000); // Simulate a 1 second delay
    });
};

// Simulate an API call to validate OTP using userId
export const otpAPI = async (userId, otp) => {
    // Simulate OTP validation API
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find((user) => user.userId === userId && user.otp === otp);
            if (user) {
                resolve(true); // OTP is correct
            } else {
                reject('Invalid OTP'); // Invalid OTP
            }
        }, 1000); // Simulate a 1 second delay
    });
};

// New API function to simulate sending OTP (returns true always)
export const sendOtp = async () => {
    // Simulate an API call to send OTP (always returns true)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true); // Always return true
        }, 1000); // Simulate a 1 second delay
    });
};