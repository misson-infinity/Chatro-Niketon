// সাইনআপ ফর্ম সাবমিট ইভেন্ট
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const name = document.getElementById('newName').value;

    // লোকাল স্টোরেজ থেকে পুরানো ডেটা আনছে
    const storedMembers = JSON.parse(localStorage.getItem('members')) || [];

    // নতুন ব্যবহারকারী যোগ করছে
    storedMembers.push({ username, password, name, isAdmin: false });

    // আপডেট হওয়া ডেটা লোকাল স্টোরেজে সংরক্ষণ করছে
    localStorage.setItem('members', JSON.stringify(storedMembers));

    alert('সাইন আপ সফল!');
    document.getElementById('signup-container').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
});

// লগইন ফর্ম সাবমিট ইভেন্ট
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // লোকাল স্টোরেজ থেকে ডেটা আনছে
    const storedMembers = JSON.parse(localStorage.getItem('members')) || [];

    const member = storedMembers.find(m => m.username === username && m.password === password);

    if (member) {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('memberName').textContent = member.name;

        if (member.isAdmin) {
            console.log('Admin logged in');
        }
    } else {
        document.getElementById('error-message').classList.remove('hidden');
    }
});
