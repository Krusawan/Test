document.addEventListener('DOMContentLoaded', () => {

    // --- MOCK DATABASE ---
    // ในการใช้งานจริง ข้อมูลนี้จะมาจาก Server/Database
    // สำหรับ GitHub Pages เราจะใช้ข้อมูลจำลองใน Array นี้
    let documents = [
        { id: 1, type: 'คำสั่งโรงเรียน', number: '12/2568', title: 'แต่งตั้งคณะกรรมการจัดกิจกรรมวันไหว้ครู', date: '2025-08-01', category: 'กลุ่มบริหารงานบุคคล', fileUrl: '#' },
        { id: 2, type: 'ประกาศโรงเรียน', number: '5/2568', title: 'ประกาศผลการสอบกลางภาคเรียนที่ 1', date: '2025-07-28', category: 'กลุ่มบริหารงานวิชาการ', fileUrl: '#' },
        { id: 3, type: 'คำสั่งโรงเรียน', number: '11/2568', title: 'การจัดสรรงบประมาณโครงการพัฒนาผู้เรียน', date: '2025-07-25', category: 'กลุ่มบริหารงานงบประมาณ', fileUrl: '#' },
        { id: 4, type: 'ประกาศโรงเรียน', number: '4/2568', title: 'เชิญชวนเข้าร่วมกิจกรรม Big Cleaning Day', date: '2025-07-22', category: 'กลุ่มงานบริหารงานทั่วไป', fileUrl: '#' },
        { id: 5, type: 'ประกาศโรงเรียน', number: '3/2568', title: 'เรื่อง การรับสมัครนักเรียนใหม่ ปีการศึกษา 2569', date: '2025-07-20', category: 'กลุ่มบริหารงานวิชาการ', fileUrl: '#' },
        { id: 6, type: 'คำสั่งโรงเรียน', number: '10/2568', title: 'การพัฒนาหลักสูตรกลุ่มสาระการเรียนรู้คณิตศาสตร์', date: '2025-07-15', category: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์', fileUrl: '#' },
        { id: 7, type: 'คำสั่งโรงเรียน', number: '9/2568', title: 'การส่งเสริมทักษะการอ่านของนักเรียน', date: '2025-07-10', category: 'กลุ่มสาระการเรียนรู้ภาษาไทย', fileUrl: '#' }
    ];

    const categories = [
        'กลุ่มสาระการเรียนรู้ภาษาไทย', 'กลุ่มสาระการเรียนรู้คณิตศาสตร์', 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี', 'กลุ่มสาระการเรียนรู้สังคมศึกษาฯ', 'กลุ่มสาระการเรียนรู้สุขศึกษาฯ', 'กลุ่มสาระการเรียนรู้ศิลปะ', 'กลุ่มสาระการเรียนรู้การงานอาชีพ', 'กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ', 'สนับสนุนการสอน', 'บุคลากรทางการศึกษา', 'กลุ่มงานบริหารงานทั่วไป', 'กลุ่มบริหารงานวิชาการ', 'กลุ่มบริหารงานงบประมาณ', 'กลุ่มบริหารงานบุคคล', 'งานระดับชั้นเรียน'
    ];
    
    // --- UTILITY FUNCTIONS ---
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Bangkok' };
        return date.toLocaleDateString('th-TH', options);
    };

    const populateCategoryOptions = (selectElementId) => {
        const select = document.getElementById(selectElementId);
        if (!select) return;

        // Clear existing options except the first one if it's a filter
        if(select.options[0] && select.options[0].value === "") {
             // Keep the "-- กรองตามหมวดหมู่ --" option
        } else {
            select.innerHTML = '';
        }
       
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            select.appendChild(option);
        });
    };

    // --- RENDER FUNCTIONS ---
    const renderNewsFeed = (filter = '', category = '') => {
        const container = document.getElementById('news-feed-container');
        if (!container) return;

        const filteredDocs = documents
            .filter(doc => doc.title.toLowerCase().includes(filter.toLowerCase()))
            .filter(doc => category === '' || doc.category === category)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        container.innerHTML = '';
        if (filteredDocs.length === 0) {
            container.innerHTML = `<div class="text-center py-10 text-gray-500"><i class="fas fa-box-open fa-3x mb-4"></i><p>ไม่พบประกาศ</p></div>`;
            return;
        }
        
        filteredDocs.forEach(doc => {
            const card = `
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
                    <div class="p-6">
                        <div class="flex justify-between items-start">
                             <div>
                                <div class="uppercase tracking-wide text-sm ${doc.type === 'คำสั่งโรงเรียน' ? 'text-amber-600' : 'text-indigo-600'} font-semibold">${doc.type}</div>
                                <a href="${doc.fileUrl}" target="_blank" class="block mt-1 text-2xl leading-tight font-bold text-black hover:underline">${doc.title}</a>
                                <p class="mt-2 text-gray-500">เลขที่: ${doc.number} | วันที่: ${formatDate(doc.date)}</p>
                             </div>
                             <a href="${doc.fileUrl}" target="_blank" class="ml-4 flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-lg hover:scale-105 transform">
                                <i class="fas fa-download fa-2x"></i>
                                <span class="text-xs mt-1">ดาวน์โหลด</span>
                             </a>
                        </div>
                        <p class="mt-4 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">
                           <i class="fas fa-tag mr-2"></i>${doc.category}
                        </p>
                    </div>
                </div>`;
            container.innerHTML += card;
        });
        AOS.refresh(); // Refresh AOS to apply animations to new elements
    };

    const renderAllDocumentsTable = (filter = '', category = '') => {
        const tbody = document.getElementById('documents-table-body');
        const noResultsDiv = document.getElementById('no-results');
        if (!tbody) return;

        const filteredDocs = documents
             .filter(doc => doc.title.toLowerCase().includes(filter.toLowerCase()) || doc.number.includes(filter))
            .filter(doc => category === '' || doc.category === category)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        tbody.innerHTML = '';
        if (filteredDocs.length === 0) {
            noResultsDiv.classList.remove('hidden');
            tbody.innerHTML = '';
        } else {
            noResultsDiv.classList.add('hidden');
            filteredDocs.forEach(doc => {
                const row = `
                    <tr class="border-b hover:bg-emerald-50 transition-colors duration-200">
                        <td class="px-6 py-4 font-medium ${doc.type === 'คำสั่งโรงเรียน' ? 'text-amber-700' : 'text-indigo-700'}">${doc.type}</td>
                        <td class="px-6 py-4">${doc.number}</td>
                        <td class="px-6 py-4 font-semibold text-gray-800">${doc.title}</td>
                        <td class="px-6 py-4">${formatDate(doc.date)}</td>
                        <td class="px-6 py-4">${doc.category}</td>
                        <td class="px-6 py-4 text-center">
                            <a href="${doc.fileUrl}" target="_blank" class="text-emerald-600 hover:text-emerald-800 transition-colors text-xl" title="ดาวน์โหลด/ดูไฟล์">
                                <i class="fas fa-file-arrow-down"></i>
                            </a>
                        </td>
                    </tr>`;
                tbody.innerHTML += row;
            });
        }
    };

    const renderAdminTable = () => {
        const tbody = document.getElementById('admin-table-body');
        if (!tbody) return;

        const sortedDocs = documents.sort((a, b) => new Date(b.date) - new Date(a.date));
        tbody.innerHTML = '';
        sortedDocs.forEach(doc => {
            const row = `
                <tr class="border-b" data-id="${doc.id}">
                    <td class="px-6 py-4">${doc.number}</td>
                    <td class="px-6 py-4 font-medium text-gray-800">${doc.title}</td>
                    <td class="px-6 py-4">${formatDate(doc.date)}</td>
                    <td class="px-6 py-4">${doc.category}</td>
                    <td class="px-6 py-4 text-center space-x-2">
                        <button class="edit-btn text-blue-500 hover:text-blue-700 transition p-2 rounded-full hover:bg-blue-100 transform hover:scale-110" title="แก้ไข">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="delete-btn text-red-500 hover:text-red-700 transition p-2 rounded-full hover:bg-red-100 transform hover:scale-110" title="ลบ">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>`;
            tbody.innerHTML += row;
        });
    };
    
    // --- EVENT HANDLERS & PAGE LOGIC ---

    // Page: Universal Search & Filter Logic
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchInput && categoryFilter) {
        populateCategoryOptions('category-filter');
        const updateView = () => {
            const searchTerm = searchInput.value;
            const selectedCategory = categoryFilter.value;
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                renderNewsFeed(searchTerm, selectedCategory);
            } else if (window.location.pathname.includes('all-documents.html')) {
                renderAllDocumentsTable(searchTerm, selectedCategory);
            }
        };
        searchInput.addEventListener('input', updateView);
        categoryFilter.addEventListener('change', updateView);
    }
    
    // Page: index.html
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        renderNewsFeed();
    }

    // Page: all-documents.html
    if (window.location.pathname.includes('all-documents.html')) {
        renderAllDocumentsTable();
    }

    // Page: admin.html
    if (window.location.pathname.includes('admin.html')) {
        const loginPrompt = document.getElementById('login-prompt');
        const adminContent = document.getElementById('admin-content');
        const loginButton = document.getElementById('login-button');
        const passwordInput = document.getElementById('password-input');
        const logoutButton = document.getElementById('logout-button');
        const addForm = document.getElementById('add-form');
        const adminTableBody = document.getElementById('admin-table-body');
        
        // Modal elements
        const editModal = document.getElementById('edit-modal');
        const editModalContent = document.getElementById('edit-modal-content');
        const cancelEditButton = document.getElementById('cancel-edit-button');
        const editForm = document.getElementById('edit-form');

        // Check login status
        const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';
        if (isLoggedIn) {
            loginPrompt.style.display = 'none';
            adminContent.classList.remove('hidden');
            populateCategoryOptions('doc-category');
            renderAdminTable();
        } else {
            logoutButton.style.display = 'none';
        }

        // Login logic
        loginButton.addEventListener('click', () => {
            // !!! ใช้รหัสผ่าน "admin" สำหรับการทดสอบเท่านั้น !!!
            if (passwordInput.value === 'admin') {
                sessionStorage.setItem('isAdminLoggedIn', 'true');
                loginPrompt.classList.add('transition-opacity', 'duration-500', 'opacity-0');
                setTimeout(() => {
                    loginPrompt.style.display = 'none';
                    adminContent.classList.remove('hidden');
                    logoutButton.style.display = 'flex';
                    populateCategoryOptions('doc-category');
                    renderAdminTable();
                    AOS.refresh();
                }, 500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'รหัสผ่านไม่ถูกต้อง',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
        
        // Logout logic
        logoutButton.addEventListener('click', () => {
             Swal.fire({
                title: 'ต้องการออกจากระบบ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'ใช่, ออกจากระบบ',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.removeItem('isAdminLoggedIn');
                    window.location.href = 'index.html';
                }
            });
        });

        // Add form submission
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newDoc = {
                id: Date.now(), // Unique ID
                type: document.getElementById('doc-type').value,
                number: document.getElementById('doc-number').value,
                title: document.getElementById('doc-title').value,
                date: document.getElementById('doc-date').value,
                category: document.getElementById('doc-category').value,
                fileUrl: '#' // Placeholder for file upload logic
            };
            documents.unshift(newDoc); // Add to the beginning of the array
            renderAdminTable();
            addForm.reset();
            Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        });

        // Edit/Delete button clicks (Event Delegation)
        adminTableBody.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            const row = target.closest('tr');
            const docId = parseInt(row.dataset.id);

            if (target.classList.contains('delete-btn')) {
                Swal.fire({
                    title: 'คุณแน่ใจหรือไม่?',
                    text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'ใช่, ลบเลย!',
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        documents = documents.filter(doc => doc.id !== docId);
                        renderAdminTable();
                        Swal.fire('ลบแล้ว!', 'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว', 'success');
                    }
                });
            }

            if (target.classList.contains('edit-btn')) {
                const docToEdit = documents.find(doc => doc.id === docId);
                if (docToEdit) {
                    // Populate and show modal
                    document.getElementById('edit-doc-id').value = docToEdit.id;
                    
                    const editTypeSelect = document.getElementById('edit-doc-type');
                    editTypeSelect.innerHTML = `<option>ประกาศโรงเรียน</option><option>คำสั่งโรงเรียน</option>`;
                    editTypeSelect.value = docToEdit.type;

                    document.getElementById('edit-doc-number').value = docToEdit.number;
                    document.getElementById('edit-doc-title').value = docToEdit.title;
                    document.getElementById('edit-doc-date').value = docToEdit.date;
                    
                    populateCategoryOptions('edit-doc-category');
                    document.getElementById('edit-doc-category').value = docToEdit.category;
                    
                    editModal.classList.remove('opacity-0', 'pointer-events-none');
                    editModalContent.classList.remove('scale-95');
                    editModalContent.classList.add('scale-100');
                }
            }
        });

        // Close Modal
        const closeModal = () => {
            editModal.classList.add('opacity-0');
            editModalContent.classList.add('scale-95');
            setTimeout(() => {
                 editModal.classList.add('pointer-events-none');
            }, 300); // Wait for transition to finish
        };
        cancelEditButton.addEventListener('click', closeModal);

        // Edit form submission
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const docId = parseInt(document.getElementById('edit-doc-id').value);
            const docIndex = documents.findIndex(doc => doc.id === docId);

            if (docIndex > -1) {
                documents[docIndex] = {
                    ...documents[docIndex], // Keep original properties like fileUrl if not changed
                    type: document.getElementById('edit-doc-type').value,
                    number: document.getElementById('edit-doc-number').value,
                    title: document.getElementById('edit-doc-title').value,
                    date: document.getElementById('edit-doc-date').value,
                    category: document.getElementById('edit-doc-category').value,
                };
                renderAdminTable();
                closeModal();
                Swal.fire({
                    icon: 'success',
                    title: 'แก้ไขข้อมูลสำเร็จ!',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
            }
        });
    }
});
