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
        const responseContainer = document.getElementById('responseContainer');
        const responseMessage = document.getElementById('responseMessage');

        if (data.status === 'success') {
            responseContainer.style.display = 'block';
            responseMessage.style.color = 'green';
            responseMessage.textContent = 'Thank you! Your inquiry has been submitted. We will get back to you shortly.';
        } else {
            responseContainer.style.display = 'block';
            responseMessage.style.color = 'red';
            responseMessage.textContent = 'Something went wrong. Please try again.';
        }
    })
    .catch(error => {
        const responseContainer = document.getElementById('responseContainer');
        const responseMessage = document.getElementById('responseMessage');
        responseContainer.style.display = 'block';
        responseMessage.style.color = 'red';
        responseMessage.textContent = `Error: ${error.message}`;
    });
});
