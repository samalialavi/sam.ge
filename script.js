// script.js

// تولید اعداد تصادفی برای سوال امنیتی
const num1 = Math.floor(Math.random() * 10) + 1; // عدد اول
const num2 = Math.floor(Math.random() * 10) + 1; // عدد دوم
const correctAnswer = num1 + num2; // پاسخ صحیح

// نمایش سوال امنیتی در کادر پاسخ
document.getElementById('antiSpamAnswer').placeholder = `What is ${num1} + ${num2}?`;

// ارسال فرم
document.getElementById('domainInquiryForm').addEventListener('submit', function(e) {
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
        antiSpamAnswer: userAnswer
    };

    // ارسال داده‌ها به سرور
    fetch('https://script.google.com/macros/s/AKfycbxUnC6e_oZjvlz8VJhk4fcslbC-EJb3IkJBk7nsiBPl_low_6FQ7OsCedsvtEpwWE2H/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Your form has been successfully submitted!';
        } else {
            alert('Something went wrong. Please try again.');
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
});

// دریافت اطلاعات بازدیدکننده
fetch('https://ipinfo.io/json?token=90e5f69ff24d4c') // جایگزین کردن YOUR_API_TOKEN با توکن API
    .then(response => response.json())
    .then(data => {
        const ipAddress = data.ip;
        const location = `${data.city}, ${data.region}, ${data.country}`; // موقعیت جغرافیایی

        // ارسال اطلاعات به Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbyIr1mqSDX7nun5mYT2lXiKvYyV6xa_ChmEjKXCHdX1Mom2on8tBflvMITKIiXvuLY18g/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                domain: window.location.hostname, // نام دامنه
                userAgent: navigator.userAgent,
                ipAddress: ipAddress,
                referrer: document.referrer || "Direct Access",
                language: navigator.language,
                resolution: `${window.screen.width}x${window.screen.height}`,
                location: location
            }),
        })
        .then(response => response.text())
        .then(data => console.log('Log saved:', data))
        .catch(error => console.error('Error:', error));
    });

