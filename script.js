const members = [
    { username: 'student1', password: 'password1', name: 'মাহি' },
    { username: 'student2', password: 'password2', name: 'রহিম' },
    { username: 'student3', password: 'password3', name: 'করিম' }
];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const member = members.find(m => m.username === username && m.password === password);

    if (member) {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('memberName').textContent = member.name;
    } else {
        document.getElementById('error-message').classList.remove('hidden');
    }
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');
});

document.getElementById('viewInfoBtn').addEventListener('click', function() {
    alert('তোমার তথ্য এখানে দেখানো হবে।');
});
