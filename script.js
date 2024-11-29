// تنظیم تایم‌اوت برای fetch
const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        ),
    ]);
};

// تولید اعداد تصادفی برای سوال امنیتی
const num1 = Math.floor(Math.random() * 10) + 1; // عدد اول
const num2 = Math.floor(Math.random() * 10) + 1; // عدد دوم
const correctAnswer = num1 + num2; // پاسخ صحیح

// نمایش سوال امنیتی در کادر پاسخ
document.getElementById('antiSpamAnswer').placeholder = `What is ${num1} + ${num2}?`;

// ارسال فرم
document.getElementById('domainInquiryForm').addEventListener('submit', function (e) {
    e.preventDefault(); // جلوگیری از ارسال پیش‌فرض

    // بررسی پاسخ
    const userAnswer = parseInt(document.getElementById('antiSpamAnswer').value.trim());
    if (userAnswer !== correctAnswer) {
        alert("Anti-spam answer is incorrect!");
        return;
    }

    // داده‌های فرم
    const formData = {
        domain: window.location.hostname, // نام دامنه
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        offer: document.getElementById('offer').value || "No offer",
        antiSpamAnswer: userAnswer,
    };

    // ارسال داده‌های فرم به سرور
    fetchWithTimeout('https://script.google.com/macros/s/AKfycbxUnC6e_oZjvlz8VJhk4fcslbC-EJb3IkJBk7nsiBPl_low_6FQ7OsCedsvtEpwWE2H/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            const responseContainer = document.getElementById('responseContainer');
            const responseMessage = document.getElementById('responseMessage');

            if (data.status === 'success') {
                responseContainer.style.display = 'block';
                responseMessage.style.color = 'green';
                responseMessage.textContent =
                    'Thank you! Your inquiry has been submitted. We will get back to you shortly.';
            } else {
                responseContainer.style.display = 'block';
                responseMessage.style.color = 'red';
                responseMessage.textContent = 'Something went wrong. Please try again.';
            }
        })
        .catch((error) => {
            const responseContainer = document.getElementById('responseContainer');
            const responseMessage = document.getElementById('responseMessage');
            responseContainer.style.display = 'block';
            responseMessage.style.color = 'red';
            responseMessage.textContent = `Error: ${error.message}`;
        });
});

// تنظیم تایم‌اوت برای fetch
const fetchWithTimeout = (url, options, timeout = 10000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        ),
    ]);
};

// ارسال لاگ بازدیدکننده
fetchWithTimeout('https://ipinfo.io/json?token=90e5f69ff24d4c', {}, 10000)
    .then((response) => response.json())
    .then((data) => {
        const ipAddress = data.ip;
        const location = `${data.city}, ${data.region}, ${data.country}`; // موقعیت جغرافیایی بازدیدکننده

        // ارسال اطلاعات بازدیدکننده به Google Apps Script
        return fetchWithTimeout(
            `https://script.google.com/macros/s/AKfycbyIr1mqSDX7nun5mYT2lXiKvYyV6xa_ChmEjKXCHdX1Mom2on8tBflvMITKIiXvuLY18g/exec?domain=${encodeURIComponent(
                window.location.hostname
            )}&userAgent=${encodeURIComponent(
                navigator.userAgent
            )}&ipAddress=${encodeURIComponent(ipAddress)}&referrer=${encodeURIComponent(
                document.referrer || 'Direct Access'
            )}&language=${encodeURIComponent(
                navigator.language
            )}&resolution=${encodeURIComponent(
                window.screen.width + 'x' + window.screen.height
            )}&location=${encodeURIComponent(location)}`,
            {},
            10000
        );
    })
    .then(() => console.log('Log saved successfully.'))
    .catch((error) => console.error('Error saving log:', error));

