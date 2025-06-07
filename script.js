        // --- Core Application Logic ---
        const appState = {
            generatedPrompt: '',
            selectedCategory: 'random',
            isGenerating: false,
            copySuccess: false,
            language: 'en',
            theme: 'dark', // Default theme
history: [],            // overall prompt history
partHistory: [],        // Track history for each prompt part
HISTORY_SIZE: 50        // Increased history size

        };

        // --- Utility Functions ---
        const getRandomElement = (array, history = []) => {
            if (!array || array.length === 0) return '';
            const available = array.filter(item => !history.includes(item));
            if (available.length > 0) {
                return available[Math.floor(Math.random() * available.length)];
            }
            // If all items are in history, pick a random one anyway
            return array[Math.floor(Math.random() * array.length)];
        };




        // --- UI Text Translations ---
        const uiText = {
            en: {
                appTitle: "AI Prompt Generator - Prompter",
                appSubtitle: "Prompt generator for AI - unprecedented, limitless creativity",
                chooseStyleTitle: "Select Your Prompt Inspiration",
                generateButtonText: "Generate New Prompt",
                yourPromptTitle: "Your Unique Prompt:",
                copyButtonTitle: "Copy to clipboard",
                downloadButtonTitle: "Download as .txt",
                copySuccessMessage: "Prompt copied successfully!",
                appStats: "Prompts that will unlock the potential of your mind",
                footerPrompter: "Prompter",
                randomCategory: "Random Mix",
                themeLightTitle: "Light Theme",
                themeDarkTitle: "Dark Theme"
            },
            tr: {
                appTitle: "YZ Prompt Üretici - Prompter",
                appSubtitle: "YZ için prompt üretici - eşi benzeri görülmemiş sınırsız yaratıcılık",
                chooseStyleTitle: "Prompt İlhamınızı Seçin",
                generateButtonText: "Yeni Prompt Üret",
                yourPromptTitle: "Benzersiz Promptunuz:",
                copyButtonTitle: "Panoya kopyala",
                downloadButtonTitle: ".txt olarak indir",
                copySuccessMessage: "Prompt başarıyla kopyalandı!",
                appStats: "Zihninizin potansiyelini açığa çıkaracak promptlar",
                footerPrompter: "Prompter",
                randomCategory: "Rastgele Karışım",
                themeLightTitle: "Açık Tema",
                themeDarkTitle: "Koyu Tema"
            }
        };

        // --- Prompt Data ---
        const prompts = {
            en: {
                inspiring: {
                    parts: [
                        ["Imagine a scenario where", "Describe a moment when", "Explore the possibility of", "Write a story about", "Consider the impact of", "Detail the process of", "Reflect on the power of", "Illustrate the beauty of", "Uncover the potential within", "Narrate the journey towards", "Chronicle the transformation of", "Document the inspiring journey of", "Narrate the life-changing experience when", "Capture the pivotal moment where", "Illustrate the profound impact of", "Recount the remarkable story of", "Share the uplifting tale about", "Portray the emotional evolution of", "Trace the inspiring trajectory of", "Convey the heartwarming account of"],
                        ["overcoming a lifelong fear", "achieving an impossible dream", "finding strength in vulnerability", "a small act of kindness changes everything", "discovering hidden talents unexpectedly", "turning failure into a stepping stone", "mentorship transforming a life", "community collaboration achieving wonders", "the resilience of the human spirit", "finding purpose in unexpected places", "a forgotten innovation that revolutionized an entire industry", "an underestimated idea that solved a global challenge", "a single conversation that altered someone's life purpose", "an unexpected collaboration that bridged impossible divides", "a quiet mentor whose influence spans generations", "a seemingly insignificant choice with cascading positive effects", "a community rallying around an unlikely cause", "a personal limitation transformed into a unique strength", "a devastating setback that sparked unprecedented growth", "a moment of vulnerability that created profound connection"],
                        ["leading to profound personal growth.", "inspiring countless others to pursue their passions.", "revealing the interconnectedness of all beings.", "demonstrating the strength found in unity.", "and redefining the limits of possibility.", "ultimately creating a legacy of hope.", "proving that perseverance conquers all obstacles.", "highlighting the importance of empathy and understanding.", "and fostering a new wave of positive change.", "leaving an indelible mark on the world.", "becoming a testament to human resilience and adaptability.", "demonstrating how apparent endings often conceal magnificent beginnings.", "revealing the extraordinary potential hidden within ordinary circumstances.", "showcasing the ripple effects of authentic self-belief.", "illustrating that meaningful change rarely follows a predictable path.", "proving that impact often transcends conventional measures of success.", "highlighting how perspective transforms obstacles into opportunities.", "exemplifying the power of embracing uncertainty with courage.", "embodying the principle that true strength emerges through vulnerability.", "underscoring how small, consistent actions create monumental change."]
                    ],
                    structure: (p) => `${p[0]} ${p[1]}, ${p[2]}`
                },
                mindBlowing: { parts: [["Think about a world where"], ["memories can be traded like currency"], ["How would society adapt?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}` },
                productivity: { parts: [["Design an effective system for"], ["permanently eliminating procrastination"], ["How could this system increase your productivity tenfold?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}` },
                educational: { parts: [["Explain the complex topic of"], ["quantum entanglement"], ["How would you explain this to a high school student?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}` },
                crazy: { parts: [["Imagine the absurd scenario where"], ["squirrels stage a coup in a major city"], ["What would be the hilarious chaos in daily life?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}` },
                perspective: { parts: [["Re-evaluate this challenge from a different angle:"], ["a major career setback"], ["How could this be an opportunity for reinvention?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}` },
                ai: { parts: [["Design an AI system that can"], ["predict natural disasters with perfect accuracy"], ["What safeguards would be necessary for such a system?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}` },
                ideas: { parts: [["Develop an innovative business idea in the field of"], ["sustainable fashion and ethical production"], ["How can this idea create new market opportunities while solving a common problem?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}` },
                hellprompts: { parts: [["Describe in depth the feeling when"], ["you realize your reflection has its own intentions"], ["How does this awareness shatter your sense of self?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}` }
            },
            tr: {
                inspiring: {
                    parts: [
                        ["Bana ilham verecek bir hikaye anlat:", "Şöyle bir senaryo yaz:", "Beni motive edecek bir durumu tasvir et:", "Harekete geçirici bir mesaj oluştur:", "Şu konuda moral verici bir söz bul:"],
                        ["hayatındaki en büyük korkuyu yenen bir insan hakkında.", "imkansız bir hayali gerçekleştiren bir girişimci üzerine.", "en zor zamanında bile umudunu kaybetmeyen bir sanatçıyla ilgili.", "küçük bir iyilikle dünyayı değiştiren bir çocuk hakkında.", "başarısızlıklarından ders çıkarıp zirveye ulaşan bir sporcuya dair.", "Nelson Mandela'nın affetme gücü üzerine.", "Marie Curie'nin bilimsel adanmışlığı hakkında.", "bir topluluğun el ele verip büyük bir sorunu çözmesiyle ilgili.", "kişisel bir trajediyi aşarak başkalarına umut olan biri hakkında.", "her gün küçük adımlarla büyük bir hedefe ulaşmanın gücü üzerine."],
                        ["Bu hikaye bana ne öğretir?", "Bu durumdan hangi dersleri çıkarabilirim?", "Bu mesaj beni nasıl daha iyi bir insan yapar?", "Bu söz bana nasıl güç verir?", "Bu senaryo bana nasıl ilham kaynağı olur?"]
                    ],
                    structure: (p) => `${p[0]} ${p[1]} ${p[2]}`
                },
                mindBlowing: {
                    parts: [
                        ["Hayal et ki:", "Şöyle bir dünya tasarla:", "Eğer şöyle olsaydı ne olurdu düşün:"],
                        ["zaman geriye doğru akıyor.", "düşüncelerimizle nesneleri hareket ettirebiliyoruz.", "hayvanlar bizimle konuşabiliyor.", "herkesin gizli bir süper gücü var.", "Mars'ta bir medeniyet keşfediyoruz.", "Elon Musk aslında bir zaman yolcusu.", "Mona Lisa tablosu gizli bir harita içeriyor."],
                        ["Bu durum dünyayı nasıl değiştirirdi?", "İnsanlık buna nasıl tepki verirdi?", "Bunun etik sonuçları neler olurdu?"]
                    ],
                    structure: (p) => `${p[0]} ${p[1]} ${p[2]}`
                },
                productivity: {
                    parts: [
                        ["Bana para kazandıracak bir iş fikri ver:", "Şu konuda bir girişim projesi tasarla:", "Verimliliğimi artıracak bir strateji oluştur:", "Ertelemeyi bırakmam için bir yöntem geliştir:", "Daha organize olmamı sağlayacak bir sistem kur:"],
                        ["evden çalışarak pasif gelir elde etmek için.", "küçük bir sermayeyle büyük bir etki yaratacak bir sosyal girişim hakkında.", "yapay zeka kullanarak kişisel verimliliği artırmak üzerine.", "günde sadece 4 saat çalışarak tam zamanlı bir gelir elde etme stratejisi.", "öğrencilerin derslerinde daha başarılı olmalarını sağlayacak bir uygulama.", "Jeff Bezos'un günlük çalışma rutininden ilham alarak.", "unutulmuş bir teknolojiyi modern bir probleme uyarlayarak."],
                        ["Bu fikir ne kadar sürede hayata geçirilebilir?", "Bu projenin potansiyel kazancı ne olur?", "Bu stratejiyi uygulamak için ilk adım ne olmalı?"]
                    ],
                    structure: (p) => `${p[0]} ${p[1]} ${p[2]}`
                },
                educational: {
                    parts: [
                        ["Bana şunu öğret:", "Şu konuda bir bilgi testi hazırla:", "Çok kısa sürede şu konuyu nasıl öğrenirim:", "Şu kavramı basitçe açıkla:", "Şu tarihi olayı özetle:"],
                        ["kuantum fiziğinin temellerini.", "iklim değişikliğinin ana nedenlerini ve sonuçlarını.", "bir hafta içinde temel İspanyolca konuşmayı.", "beynimizin nasıl öğrendiğini.", "Fransız Devrimi'nin en önemli olaylarını.", "Carl Sagan'ın evren anlayışını.", "bir bilgisayarın çalışma prensibini."],
                        ["Bu bilgiyi günlük hayatta nasıl kullanabilirim?", "Bu konuyu daha derinlemesine öğrenmek için hangi kaynaklara başvurmalıyım?", "Bu testi çözerek ne kadar öğrendiğimi nasıl anlarım?"]
                    ],
                    structure: (p) => `${p[0]} ${p[1]} ${p[2]}`
                },
                crazy: {
                    parts: [
                        ["Çok komik bir senaryo yaz:", "Aklımı başımdan alacak bir fikir üret:", "Şaşırtıcı bir durum hayal et:", "Kara mizah içeren bir hikaye anlat:", "Tamamen absürt bir olay tasarla:"],
                        ["kedilerin dünyayı yönettiği bir gün.", "Albert Einstein'ın bir stand-up şovunda sahne alması.", "politikacıların sadece rap müzikle tartıştığı bir meclis.", "yerçekiminin rastgele tatile çıktığı bir hafta.", "tüm insanların aniden sadece gerçeği söyleyebildiği bir sabah.", "Donald Trump ve Joe Biden'ın bir video oyununda takım olması.", "Sünger Bob'un Wall Street'te CEO olması.", "Tüm emojilerin canlandığı ve dünyayı istila ettiği bir senaryo.", "Sherlock Holmes'un en büyük gizeminin kayıp çorabının teki olması."],
                        ["Bu durumun en komik yanı ne olurdu?", "İnsanlar bu duruma nasıl tepki verirdi?", "Bu senaryo nasıl bir kaosa yol açardı?"]
                    ],
                    structure: (p) => `${p[0]} ${p[1]} ${p[2]}`
                },
                perspective: {
                    parts: [
                        ["Şu duruma farklı bir bakış açısıyla yaklaş:", "Gerçekliği tersine çevirerek düşün:", "Şu olayı bambaşka bir gözle değerlendir:", "Eğer her şey tam tersi olsaydı ne olurdu:", "Şu kavramı yeniden tanımla:"],
                        ["başarısızlık aslında bir başarıdır.", "zamanın doğrusal değil döngüsel olduğunu.", "en büyük düşmanının aslında en iyi dostun olduğunu.", "tüm sorunlarının aslında birer fırsat olduğunu.", "yaşadığımız dünyanın bir simülasyon olduğunu.", "Platon'un mağara alegorisinin günümüzdeki yansımasını.", "'normal' kavramının tamamen göreceli olduğunu."],
                        ["Bu yeni bakış açısı hayatımı nasıl etkilerdi?", "Bu düşünce beni hangi yeni keşiflere götürürdü?", "Bu perspektif kararlarımı nasıl değiştirirdi?"]
                    ],
                    structure: (p) => `${p[0]} ${p[1]} ${p[2]}`
                },
                ai: {
                    parts: [
                        ["Gelecekte yapay zeka nasıl olacak, bir senaryo yaz:", "Bana yapay zekayı kısa sürede öğretecek bir yol haritası çiz:", "Şu konuda uzmanlaşmak için en iyi AI araçları nelerdir:", "Yapay zekanın sınırlarını zorlayan bir fikir geliştir:", "Eğer yapay zeka bilinç kazansaydı ne olurdu, bir hikaye anlat:"],
                        ["insanlığın en büyük sorunlarını çözen bir yapay zeka.", "sanat üreten ve duyguları olan bir yapay zeka.", "eğitim sistemini tamamen değiştiren bir yapay zeka.", "insanlarla dost olan bir yapay zeka.", "kendi kendini geliştiren ve kontrolden çıkan bir yapay zeka.", "OpenAI'ın bir sonraki devrimsel projesi ne olabilir?", "Google DeepMind'ın insanlığa en büyük katkısı ne olacak?"],
                        ["Bu senaryonun olası riskleri nelerdir?", "Bu fikir insanlığa nasıl fayda sağlar?", "Bu araçları kullanarak hangi projeler geliştirebilirim?"]
                    ],
                    structure: (p) => `${p[0]} ${p[1]} ${p[2]}`
                },
                ideas: {
                    parts: [
                        ["Çok tutacak bir film fikri ver:", "Viral olacak bir oyun tasarla:", "Milyonlarca indirilecek bir uygulama konsepti oluştur:", "Okunma rekorları kıracak bir kitap konusu bul:", "Hemen popüler olacak bir şarkı için ilham ver:", "Yeni bir dizi konsepti geliştir:", "Çocuklar için eğitici bir animasyon fikri üret:"],
                        ["insanlığın sonunu getiren bir virüsten kurtulan bir grup insanın hikayesi.", "tarihi bir olayı konu alan epik bir aksiyon filmi.", "uzayda geçen bir korku-gerilim filmi.", "farklı süper güçlere sahip gençlerin maceralarını anlatan bir anime.", "basit ama bağımlılık yapan bir mobil oyun.", "günlük hayatı kolaylaştıran yenilikçi bir sosyal medya uygulaması.", "fantastik bir dünyada geçen sürükleyici bir roman serisi.", "unutulmaz bir aşkı anlatan dokunaklı bir pop şarkısı.", "bir grup arkadaşın başından geçen komik olayları anlatan bir sitcom.", "hayvanların gizli yaşamlarını konu alan eğlenceli bir çocuk animasyonu.", "Game of Thrones tarzında ama Osmanlı İmparatorluğu'nda geçen bir dizi.", "Cyberpunk 2077 evreninde geçen bir dedektiflik hikayesi."],
                        ["Bu fikrin hedef kitlesi kimler olmalı?", "Bu projeyi hayata geçirmek için hangi kaynaklara ihtiyaç var?", "Bu konsepti benzerlerinden ayıran en önemli özellik ne?"]
                    ],
                    structure: (p) => `${p[0]} ${p[1]} ${p[2]}`
                },
                hellprompts: {
                    parts: [
                        ["Şu durumda hissedilen duyguyu derinlemesine anlat:", "Şu psikolojik korku durumunu detaylı olarak incele:", "Şu anın yarattığı varoluşsal tedirginliği tasvir et:", "Şu gerçekliğin uyandırdığı kozmik dehşeti betimle:", "Şu rahatsız edici keşfin yarattığı duyguları analiz et:", "Şu deneyimi yaşayan birinin zihinsel durumunu anlat:", "Şu olguyla ilişkili derin korkuyu keşfet:", "Şu senaryonun yarattığı varoluşsal krizi tasvir et:", "Şu durumun tetiklediği derin tedirginliği anlat:", "Şu olgunun neden olduğu zihinsel çözülmeyi betimle:"],
                        ["yansımanızın kendi niyetleri olduğunu fark ettiğinizde.", "anılarınızın bilinmeyen bir güç tarafından değiştirildiğini anladığınızda.", "fizik yasalarının algınızın sınırlarında çözülmeye başladığını gördüğünüzde.", "sessizliğin kendisinin kötü niyetli bir varlık haline geldiğini hissettiğinizde.", "kendi düşüncelerinizin artık tamamen size ait olmadığını fark ettiğinizde.", "zaman döngülerinin mükemmel sıfırlanmadığını ve hatalar bıraktığını keşfettiğinizde.", "gerçekliğin kırılgan bir yapı olduğuna dair kanıtlarla karşılaştığınızda.", "unutulmuş rüyalarla beslenen parazitik bir varlığın varlığını hissettiğinizde.", "insan bilincinin evrimsel bir kaza olduğunu anladığınızda.", "sıradan desenlerde gizlenmiş kozmik bir gerçeği fark ettiğinizde.", "H.P. Lovecraft'ın bir karakterinin zihninde bir gün geçirdiğinde.", "Stephen King romanındaki bir kasabada mahsur kaldığında."],
                        ["Bu farkındalık, benlik algınızı nasıl parçalara ayırır?", "Bu durum, nasıl derin ve kaçınılmaz bir paranoyaya yol açar?", "Bu keşif, algıladığınız gerçekliği nasıl tamamen çökertir?", "Bu deneyim, her sessiz anı nasıl bir korku kaynağına dönüştürür?", "Bu farkındalık, kimlik ve dış etki arasındaki sınırları nasıl bulanıklaştırır?"]
                    ],
                    structure: (p) => `${p[0]} ${p[1]} ${p[2]}`
                }
            }
        };

        // --- Category Definitions ---
        const categories = [
            { id: 'random', icon: 'shuffle', name: { en: 'Random Mix', tr: 'Rastgele Karışım' } },
            { id: 'inspiring', icon: 'sunrise', name: { en: 'Inspiring', tr: 'İlham Verici' } },
            { id: 'mindBlowing', icon: 'brain-circuit', name: { en: 'Mind-blowing', tr: 'Ufuk Açıcı' } },
            { id: 'productivity', icon: 'zap', name: { en: 'Productivity', tr: 'Üretkenlik' } },
            { id: 'educational', icon: 'graduation-cap', name: { en: 'Educational', tr: 'Eğitici' } },
            { id: 'crazy', icon: 'laugh', name: { en: 'Crazy', tr: 'Çılgın Fikirler' } }, // Updated name
            { id: 'perspective', icon: 'glasses', name: { en: 'Perspective', tr: 'Bakış Açısı' } },
            { id: 'ai', icon: 'cpu', name: { en: 'AI', tr: 'YZ' } }, // Updated name
            { id: 'ideas', icon: 'lightbulb', name: { en: 'Ideas', tr: 'Fikirler' } },
            { id: 'hellprompts', icon: 'skull', name: { en: 'Hellprompts', tr: 'Cehennem Promptları' } } // New category
        ];

        // --- DOM Elements ---
        const categoryButtonsContainer = document.getElementById('category-buttons');
        const generateButton = document.getElementById('generate-button');
        const promptDisplayArea = document.getElementById('prompt-display-area');
        const generatedPromptText = document.getElementById('generated-prompt-text');
        const copyButton = document.getElementById('copy-button');
        const downloadButton = document.getElementById('download-button');
        const copySuccessMessage = document.getElementById('copy-success-message');
        const langEnButton = document.getElementById('lang-en');
        const langTrButton = document.getElementById('lang-tr');
        const themeLightButton = document.getElementById('theme-light');
        const themeDarkButton = document.getElementById('theme-dark');
        const themeStyleElement = document.getElementById('theme-styles');

        // --- Theme Toggle Logic ---
        const THEMES = { LIGHT: 'light', DARK: 'dark' };
        const themeStyles = {
            [THEMES.LIGHT]: `
                body { background-image: linear-gradient(to bottom right, #f0f4ff, #d9e2ff, #c4d1ff) !important; color: #1a1a2e !important; }
                .bg-white\/10 { background-color: rgba(255, 255, 255, 0.8) !important; border-color: rgba(0, 0, 0, 0.1) !important; }
                .bg-black\/30 { background-color: rgba(0, 0, 0, 0.05) !important; color: #1e293b !important; }
                .text-blue-200 { color: #4338ca !important; }
                .text-blue-300 { color: #3730a3 !important; }
                .border-white\/20 { border-color: rgba(0, 0, 0, 0.1) !important; }
                .bg-black\/20 { background-color: rgba(0, 0, 0, 0.05) !important; }
                .hover\:bg-white\/10:hover { background-color: rgba(0, 0, 0, 0.1) !important; }
                .bg-white\/30 { background-color: rgba(0, 0, 0, 0.2) !important; }
                .hover\:bg-white\/30:hover { background-color: rgba(0, 0, 0, 0.3) !important; }
                .focus\:ring-white\/50:focus { --tw-ring-color: rgba(0, 0, 0, 0.3) !important; }
                .category-button { background-color: rgba(0, 0, 0, 0.08) !important; color: #1a1a2e !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; }
                .category-button:hover { background-color: rgba(0, 0, 0, 0.15) !important; }
                .category-button.selected { background-image: linear-gradient(to right, #6366f1, #8b5cf6) !important; color: white !important; border-color: transparent !important; }
                .category-button .lucide { color: #4f46e5 !important; }
                .category-button.selected .lucide { color: white !important; }
                #app-title { background-image: linear-gradient(to right, #4f46e5, #7c3aed) !important; }
                #choose-style-title, #your-prompt-title { color: #1e293b !important; }
                #lang-en, #lang-tr { color: #4338ca !important; }
                #lang-en.active, #lang-tr.active { background-color: rgba(0, 0, 0, 0.2) !important; color: #1e293b !important; }
                .theme-toggle-container i { color: #4338ca !important; }
                .theme-toggle-container button { color: #4338ca !important; }
                .theme-toggle-container button.active { background-color: rgba(0, 0, 0, 0.2) !important; color: #1e293b !important; }
                .absolute.top-4.right-4 i { color: #4338ca !important; }
            `,
            [THEMES.DARK]: `
                body { background-image: linear-gradient(to bottom right, #581c87, #1e3a8a, #312e81) !important; color: white !important; }
                .bg-white\/10 { background-color: rgba(255, 255, 255, 0.1) !important; border-color: rgba(255, 255, 255, 0.2) !important; }
                .bg-black\/30 { background-color: rgba(0, 0, 0, 0.3) !important; color: white !important; }
                .text-blue-200 { color: #bfdbfe !important; }
                .text-blue-300 { color: #93c5fd !important; }
                .border-white\/20 { border-color: rgba(255, 255, 255, 0.2) !important; }
                .bg-black\/20 { background-color: rgba(0, 0, 0, 0.2) !important; }
                .hover\:bg-white\/10:hover { background-color: rgba(255, 255, 255, 0.1) !important; }
                .bg-white\/30 { background-color: rgba(255, 255, 255, 0.3) !important; }
                .hover\:bg-white\/30:hover { background-color: rgba(255, 255, 255, 0.3) !important; }
                .focus\:ring-white\/50:focus { --tw-ring-color: rgba(255, 255, 255, 0.5) !important; }
                .category-button { background-color: rgba(255, 255, 255, 0.2) !important; color: white !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; }
                .category-button:hover { background-color: rgba(255, 255, 255, 0.3) !important; }
                .category-button.selected { background-image: linear-gradient(to right, #a855f7, #ec4899) !important; color: white !important; border-color: transparent !important; }
                .category-button .lucide { color: white !important; }
                #app-title { background-image: linear-gradient(to right, #22d3ee, #c084fc) !important; }
                #choose-style-title, #your-prompt-title { color: white !important; }
                #lang-en, #lang-tr { color: #bfdbfe !important; }
                #lang-en.active, #lang-tr.active { background-color: rgba(255, 255, 255, 0.3) !important; color: white !important; }
                .theme-toggle-container i { color: #bfdbfe !important; }
                .theme-toggle-container button { color: #bfdbfe !important; }
                .theme-toggle-container button.active { background-color: rgba(255, 255, 255, 0.3) !important; color: white !important; }
                .absolute.top-4.right-4 i { color: #93c5fd !important; }
            `
        };

        const setTheme = (theme) => {
            appState.theme = theme;
            themeStyleElement.textContent = themeStyles[theme];
            if (theme === THEMES.LIGHT) {
                themeLightButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
                themeLightButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
                themeDarkButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
                themeDarkButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            } else {
                themeDarkButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
                themeDarkButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
                themeLightButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
                themeLightButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
            localStorage.setItem('theme', theme);
            // Update button titles based on theme and language
            updateButtonTitles();
        };

        // --- Language Switching Logic ---
        const setLanguage = (lang) => {
            appState.language = lang;
            // Update UI text
            document.getElementById('app-title').textContent = uiText[lang].appTitle;
            document.getElementById('app-subtitle').textContent = uiText[lang].appSubtitle;
            document.getElementById('choose-style-title').textContent = uiText[lang].chooseStyleTitle;
            document.getElementById('generate-button-text').textContent = uiText[lang].generateButtonText;
            document.getElementById('your-prompt-title').textContent = uiText[lang].yourPromptTitle;
            copyButton.title = uiText[lang].copyButtonTitle;
            downloadButton.title = uiText[lang].downloadButtonTitle;
            copySuccessMessage.textContent = uiText[lang].copySuccessMessage;
            document.getElementById('app-stats').textContent = uiText[lang].appStats;
            document.getElementById('footer-prompter').textContent = uiText[lang].footerPrompter;

            // Update category button text
            categories.forEach(category => {
                const button = document.getElementById(`category-${category.id}`);
                if (button) {
                    button.querySelector('span').textContent = category.name[lang];
                }
            });

            // Update language button styles
            if (lang === 'en') {
                langEnButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
                langEnButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
                langTrButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
                langTrButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            } else {
                langTrButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
                langTrButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
                langEnButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
                langEnButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
            localStorage.setItem('language', lang);
            // Update theme button titles based on language
            updateButtonTitles();
        };

        const updateButtonTitles = () => {
             themeLightButton.title = uiText[appState.language].themeLightTitle;
             themeDarkButton.title = uiText[appState.language].themeDarkTitle;
        };

        // --- Prompt Generation Logic ---
        const generatePrompt = () => {
            appState.isGenerating = true;
            generateButton.disabled = true;
            generatedPromptText.innerHTML = '<div class="flex justify-center items-center h-20"><i data-lucide="loader-2" class="w-6 h-6 animate-spin"></i></div>';
            lucide.createIcons(); // Render spinner icon
            promptDisplayArea.classList.remove('hidden');
            promptDisplayArea.classList.add('animate-fadeIn');

            setTimeout(() => {
                let categoryData;
                let selectedCatId = appState.selectedCategory;

                if (selectedCatId === 'random') {
                    // Exclude 'random' itself from random selection
                    const availableCategories = categories.filter(c => c.id !== 'random');
                    selectedCatId = availableCategories[Math.floor(Math.random() * availableCategories.length)].id;
                }

                categoryData = prompts[appState.language][selectedCatId];

                if (!categoryData || !categoryData.parts || !Array.isArray(categoryData.parts)) {
                    console.error(`Invalid data for category: ${selectedCatId}, language: ${appState.language}`);
                    generatedPromptText.textContent = 'Error generating prompt. Please try again.';
                    appState.isGenerating = false;
                    generateButton.disabled = false;
                    return;
                }


                const promptParts = categoryData.parts.map((partArray, idx) => {
                    if (!appState.partHistory[idx]) {
                        appState.partHistory[idx] = [];
                    }
                    const element = getRandomElement(partArray, appState.partHistory[idx]);
                    appState.partHistory[idx].push(element);
                    if (appState.partHistory[idx].length > appState.HISTORY_SIZE) {
                        appState.partHistory[idx].shift();
                    }
                    return element;
                });
                const newPrompt = categoryData.structure(promptParts);

                // Update history for each part (FIFO queue)
                promptParts.forEach((part, idx) => {
                    const hist = appState.history[idx];
                    hist.push(part);
                    if (hist.length > appState.HISTORY_SIZE) {
                        hist.shift();
                    }
                });

                appState.generatedPrompt = newPrompt;
                generatedPromptText.textContent = newPrompt;
                appState.isGenerating = false;
                generateButton.disabled = false;
            }, 300); // Simulate generation time
        };

        // --- Event Listeners ---
        const setupEventListeners = () => {
            // Category buttons
            categories.forEach(category => {
                const button = document.getElementById(`category-${category.id}`);
                if (button) {
                    button.addEventListener('click', () => {
                        appState.selectedCategory = category.id;
                        document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('selected'));
                        button.classList.add('selected');
                    });
                }
            });

            // Generate button
            generateButton.addEventListener('click', generatePrompt);

            // Copy button
            copyButton.addEventListener('click', () => {
                if (!appState.generatedPrompt) return;
                navigator.clipboard.writeText(appState.generatedPrompt).then(() => {
                    appState.copySuccess = true;
                    copySuccessMessage.classList.remove('hidden');
                    setTimeout(() => {
                        copySuccessMessage.classList.add('hidden');
                        appState.copySuccess = false;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    alert('Failed to copy prompt. Please try again.');
                });
            });

            // Download button
            downloadButton.addEventListener('click', () => {
                if (!appState.generatedPrompt) return;
                const blob = new Blob([appState.generatedPrompt], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `prompt_${appState.selectedCategory}_${Date.now()}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

            // Language buttons
            langEnButton.addEventListener('click', () => setLanguage('en'));
            langTrButton.addEventListener('click', () => setLanguage('tr'));

            // Theme buttons
            themeLightButton.addEventListener('click', () => setTheme(THEMES.LIGHT));
            themeDarkButton.addEventListener('click', () => setTheme(THEMES.DARK));
        };

        // --- Initialization ---
        const initializeApp = () => {
            // Load categories
            categories.forEach(category => {
                const button = document.createElement('button');
                button.id = `category-${category.id}`;
                button.className = 'category-button';
                if (category.id === appState.selectedCategory) {
                    button.classList.add('selected');
                }
                button.innerHTML = `
                    <i data-lucide="${category.icon}" class="lucide"></i>
                    <span>${category.name[appState.language]}</span>
                `;
                categoryButtonsContainer.appendChild(button);
            });

            // Initialize Lucide icons
            lucide.createIcons();

            // Load saved language or default to 'en'
            const savedLanguage = localStorage.getItem('language') || 'en';
            setLanguage(savedLanguage);

            // Load saved theme or default to 'dark'
            const savedTheme = localStorage.getItem('theme') || THEMES.DARK;
            setTheme(savedTheme);

            // Setup event listeners
            setupEventListeners();
        };

        // --- Run Initialization ---
        document.addEventListener('DOMContentLoaded', initializeApp);

