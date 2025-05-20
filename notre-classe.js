const filterButtons = document.querySelectorAll('.filter-button');
        const studentCards = document.querySelectorAll('.student-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
               
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                
                studentCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-team') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        
        const modal = document.getElementById('studentModal');
        const modalPhoto = document.getElementById('modalPhoto');
        const modalName = document.getElementById('modalName');
        const modalTeam = document.getElementById('modalTeam');
        const modalButton = document.getElementById('modalButton');
        const closeModal = document.querySelector('.close-modal');
        
        
        studentCards.forEach(card => {
            const studentInfo = card.querySelector('.student-info');
            
            studentInfo.addEventListener('click', (e) => {
                
                if (e.target.classList.contains('view-site-button')) {
                    return;
                }
                
                const photo = card.querySelector('.student-photo img').src;
                const name = card.querySelector('.student-name').textContent;
                const team = card.querySelector('.student-team').textContent;
                const link = card.querySelector('.view-site-button').href;
                const isLeader = card.querySelector('.leader-badge') !== null;
                
                modalPhoto.src = photo;
                modalName.textContent = name;
                modalTeam.textContent = team + (isLeader ? ' (Leader)' : '');
                modalButton.href = link;
                
                modal.style.display = 'flex';
            });
        });
        
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });



         