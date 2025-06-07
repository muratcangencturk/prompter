// Optimized Prompt Structures for Turkish and English
// This file contains improved prompt combinations with better sentence structure and logic

const optimizedPrompts = {
    en: {
        inspiring: {
            parts: [
                ["Imagine a scenario where", "Describe a moment when", "Explore the possibility of", "Write a story about", "Consider the impact of", "Detail the process of", "Reflect on the power of", "Illustrate the beauty of", "Uncover the potential within", "Narrate the journey towards", "Chronicle the transformation of", "Document the inspiring journey of", "Narrate the life-changing experience when", "Capture the pivotal moment where", "Illustrate the profound impact of", "Recount the remarkable story of", "Share the uplifting tale about", "Portray the emotional evolution of", "Trace the inspiring trajectory of", "Convey the heartwarming account of"],
                ["overcoming a lifelong fear", "achieving an impossible dream", "finding strength in vulnerability", "a small act of kindness changes everything", "discovering hidden talents unexpectedly", "turning failure into a stepping stone", "mentorship transforming a life", "community collaboration achieving wonders", "the resilience of the human spirit", "finding purpose in unexpected places", "a forgotten innovation that revolutionized an entire industry", "an underestimated idea that solved a global challenge", "a single conversation that altered someone's life purpose", "an unexpected collaboration that bridged impossible divides", "a quiet mentor whose influence spans generations", "a seemingly insignificant choice with cascading positive effects", "a community rallying around an unlikely cause", "a personal limitation transformed into a unique strength", "a devastating setback that sparked unprecedented growth", "a moment of vulnerability that created profound connection"],
                ["leading to profound personal growth.", "inspiring countless others to pursue their passions.", "revealing the interconnectedness of all beings.", "demonstrating the strength found in unity.", "and redefining the limits of possibility.", "ultimately creating a legacy of hope.", "proving that perseverance conquers all obstacles.", "highlighting the importance of empathy and understanding.", "and fostering a new wave of positive change.", "leaving an indelible mark on the world.", "becoming a testament to human resilience and adaptability.", "demonstrating how apparent endings often conceal magnificent beginnings.", "revealing the extraordinary potential hidden within ordinary circumstances.", "showcasing the ripple effects of authentic self-belief.", "illustrating that meaningful change rarely follows a predictable path.", "proving that impact often transcends conventional measures of success.", "highlighting how perspective transforms obstacles into opportunities.", "exemplifying the power of embracing uncertainty with courage.", "embodying the principle that true strength emerges through vulnerability.", "underscoring how small, consistent actions create monumental change."]
            ],
            structure: (parts) => `${parts[0]} ${parts[1]}, ${parts[2]}`
        },
        mindBlowing: { parts: [["Think about a world where"], ["memories can be traded like currency"], ["How would society adapt?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}`},
        productivity: { parts: [["Design an effective system for"], ["permanently eliminating procrastination"], ["How could this system increase your productivity tenfold?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}`},
        educational: { parts: [["Explain the complex topic of"], ["quantum entanglement"], ["How would you explain this to a high school student?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}`},
        crazy: { parts: [["Imagine the absurd scenario where"], ["squirrels stage a coup in a major city"], ["What would be the hilarious chaos in daily life?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}`},
        perspective: { parts: [["Re-evaluate this challenge from a different angle:"], ["a major career setback"], ["How could this be an opportunity for reinvention?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}`},
        ai: { parts: [["Design an AI system that can"], ["predict natural disasters with perfect accuracy"], ["What safeguards would be necessary for such a system?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}`},
        ideas: { parts: [["Develop an innovative business idea in the field of"], ["sustainable fashion and ethical production"], ["How can this idea create new market opportunities while solving a common problem?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}`},
        hellprompts: { parts: [["Describe in depth the feeling when"], ["you realize your reflection has its own intentions"], ["How does this awareness shatter your sense of self?"]], structure: (p) => `${p[0]} ${p[1]}. ${p[2]}`}
    },
    tr: {
        inspiring: {
            parts: [
                ["Bana ilham verecek bir hikaye anlat:", "Şöyle bir senaryo yaz:", "Beni motive edecek bir durumu tasvir et:", "Harekete geçirici bir mesaj oluştur:", "Şu konuda moral verici bir söz bul:"],
                ["hayatındaki en büyük korkuyu yenen bir insan hakkında.", "imkansız bir hayali gerçekleştiren bir girişimci üzerine.", "en zor zamanında bile umudunu kaybetmeyen bir sanatçıyla ilgili.", "küçük bir iyilikle dünyayı değiştiren bir çocuk hakkında.", "başarısızlıklarından ders çıkarıp zirveye ulaşan bir sporcuyla ilgili.", "Nelson Mandela'nın affetme gücü üzerine.", "Marie Curie'nin bilimsel adanmışlığı hakkında.", "bir topluluğun el ele verip büyük bir sorunu çözmesiyle ilgili.", "kişisel bir trajediyi aşarak başkalarına umut olan biri hakkında.", "her gün küçük adımlarla büyük bir hedefe ulaşmanın gücü üzerine."],
                ["Bu hikaye bana ne öğretir?", "Bu durumdan hangi dersleri çıkarabilirim?", "Bu mesaj beni nasıl daha iyi bir insan yapar?", "Bu söz bana nasıl güç verir?", "Bu senaryo bana nasıl ilham kaynağı olur?"]
            ],
            structure: (parts) => `${parts[0]} ${parts[1]} ${parts[2]}`
        },
        mindBlowing: {
            parts: [
                ["Hayal et ki:", "Şöyle bir dünya tasarla:", "Eğer şöyle olsaydı ne olurdu düşün:"],
                ["zaman geriye doğru akıyor.", "düşüncelerimizle nesneleri hareket ettirebiliyoruz.", "hayvanlar bizimle konuşabiliyor.", "herkesin gizli bir süper gücü var.", "Mars'ta bir medeniyet keşfediyoruz.", "Elon Musk aslında bir zaman yolcusu.", "Mona Lisa tablosu gizli bir harita içeriyor."],
                ["Bu durum dünyayı nasıl değiştirirdi?", "İnsanlık buna nasıl tepki verirdi?", "Bunun etik sonuçları neler olurdu?"]
            ],
            structure: (parts) => `${parts[0]} ${parts[1]} ${parts[2]}`
        },
        productivity: {
            parts: [
                ["Bana para kazandıracak bir iş fikri ver:", "Şu konuda bir girişim projesi tasarla:", "Verimliliğimi artıracak bir strateji oluştur:", "Ertelemeyi bırakmam için bir yöntem geliştir:", "Daha organize olmamı sağlayacak bir sistem kur:"],
                ["evden çalışarak pasif gelir elde etmek için.", "küçük bir sermayeyle büyük bir etki yaratacak bir sosyal girişim hakkında.", "yapay zeka kullanarak kişisel verimliliği artırmak üzerine.", "günde sadece 4 saat çalışarak tam zamanlı bir gelir elde etme stratejisi.", "öğrencilerin derslerinde daha başarılı olmalarını sağlayacak bir uygulama.", "Jeff Bezos'un günlük çalışma rutininden ilham alarak.", "unutulmuş bir teknolojiyi modern bir probleme uyarlayarak."],
                ["Bu fikir ne kadar sürede hayata geçirilebilir?", "Bu projenin potansiyel kazancı ne olur?", "Bu stratejiyi uygulamak için ilk adım ne olmalı?"]
            ],
            structure: (parts) => `${parts[0]} ${parts[1]} ${parts[2]}`
        },
        educational: {
            parts: [
                ["Bana şunu öğret:", "Şu konuda bir bilgi testi hazırla:", "Çok kısa sürede şu konuyu nasıl öğrenirim:", "Şu kavramı basitçe açıkla:", "Şu tarihi olayı özetle:"],
                ["kuantum fiziğinin temellerini.", "iklim değişikliğinin ana nedenlerini ve sonuçlarını.", "bir hafta içinde temel İspanyolca konuşmayı.", "beynimizin nasıl öğrendiğini.", "Fransız Devrimi'nin en önemli olaylarını.", "Carl Sagan'ın evren anlayışını.", "bir bilgisayarın çalışma prensibini."],
                ["Bu bilgiyi günlük hayatta nasıl kullanabilirim?", "Bu konuyu daha derinlemesine öğrenmek için hangi kaynaklara başvurmalıyım?", "Bu testi çözerek ne kadar öğrendiğimi nasıl anlarım?"]
            ],
            structure: (parts) => `${parts[0]} ${parts[1]} ${parts[2]}`
        },
        crazy: {
            parts: [
                ["Çok komik bir senaryo yaz:", "Aklımı başımdan alacak bir fikir üret:", "Şaşırtıcı bir durum hayal et:", "Kara mizah içeren bir hikaye anlat:", "Tamamen absürt bir olay tasarla:"],
                ["kedilerin dünyayı yönettiği bir gün.", "Albert Einstein'ın bir stand-up şovunda sahne alması.", "politikacıların sadece rap müzikle tartıştığı bir meclis.", "yerçekiminin rastgele tatile çıktığı bir hafta.", "tüm insanların aniden sadece gerçeği söyleyebildiği bir sabah.", "Donald Trump ve Joe Biden'ın bir video oyununda takım olması.", "Sünger Bob'un Wall Street'te CEO olması.", "Tüm emojilerin canlandığı ve dünyayı istila ettiği bir senaryo.", "Sherlock Holmes'un en büyük gizeminin kayıp çorabının teki olması."],
                ["Bu durumun en komik yanı ne olurdu?", "İnsanlar bu duruma nasıl tepki verirdi?", "Bu senaryo nasıl bir kaosa yol açardı?"]
            ],
            structure: (parts) => `${parts[0]} ${parts[1]} ${parts[2]}`
        },
        perspective: {
            parts: [
                ["Şu duruma farklı bir bakış açısıyla yaklaş:", "Gerçekliği tersine çevirerek düşün:", "Şu olayı bambaşka bir gözle değerlendir:", "Eğer her şey tam tersi olsaydı ne olurdu:", "Şu kavramı yeniden tanımla:"],
                ["başarısızlık aslında bir başarıdır.", "zamanın doğrusal değil döngüsel olduğunu.", "en büyük düşmanının aslında en iyi dostun olduğunu.", "tüm sorunlarının aslında birer fırsat olduğunu.", "yaşadığımız dünyanın bir simülasyon olduğunu.", "Platon'un mağara alegorisinin günümüzdeki yansımasını.", "'normal' kavramının tamamen göreceli olduğunu."],
                ["Bu yeni bakış açısı hayatımı nasıl etkilerdi?", "Bu düşünce beni hangi yeni keşiflere götürürdü?", "Bu perspektif kararlarımı nasıl değiştirirdi?"]
            ],
            structure: (parts) => `${parts[0]} ${parts[1]} ${parts[2]}`
        },
        ai: {
            parts: [
                ["Gelecekte yapay zeka nasıl olacak, bir senaryo yaz:", "Bana yapay zekayı kısa sürede öğretecek bir yol haritası çiz:", "Şu konuda uzmanlaşmak için en iyi AI araçları nelerdir:", "Yapay zekanın sınırlarını zorlayan bir fikir geliştir:", "Eğer yapay zeka bilinç kazansaydı ne olurdu, bir hikaye anlat:"],
                ["insanlığın en büyük sorunlarını çözen bir yapay zeka.", "sanat üreten ve duyguları olan bir yapay zeka.", "eğitim sistemini tamamen değiştiren bir yapay zeka.", "insanlarla dost olan bir yapay zeka.", "kendi kendini geliştiren ve kontrolden çıkan bir yapay zeka.", "OpenAI'ın bir sonraki devrimsel projesi ne olabilir?", "Google DeepMind'ın insanlığa en büyük katkısı ne olacak?"],
                ["Bu senaryonun olası riskleri nelerdir?", "Bu fikir insanlığa nasıl fayda sağlar?", "Bu araçları kullanarak hangi projeler geliştirebilirim?"]
            ],
            structure: (parts) => `${parts[0]} ${parts[1]} ${parts[2]}`
        },
        ideas: {
            parts: [
                ["Çok tutacak bir film fikri ver:", "Viral olacak bir oyun tasarla:", "Milyonlarca indirilecek bir uygulama konsepti oluştur:", "Okunma rekorları kıracak bir kitap konusu bul:", "Hemen popüler olacak bir şarkı için ilham ver:", "Yeni bir dizi konsepti geliştir:", "Çocuklar için eğitici bir animasyon fikri üret:"],
                ["insanlığın sonunu getiren bir virüsten kurtulan bir grup insanın hikayesi.", "tarihi bir olayı konu alan epik bir aksiyon filmi.", "uzayda geçen bir korku-gerilim filmi.", "farklı süper güçlere sahip gençlerin maceralarını anlatan bir anime.", "basit ama bağımlılık yapan bir mobil oyun.", "günlük hayatı kolaylaştıran yenilikçi bir sosyal medya uygulaması.", "fantastik bir dünyada geçen sürükleyici bir roman serisi.", "unutulmaz bir aşkı anlatan dokunaklı bir pop şarkısı.", "bir grup arkadaşın başından geçen komik olayları anlatan bir sitcom.", "hayvanların gizli yaşamlarını konu alan eğlenceli bir çocuk animasyonu.", "Game of Thrones tarzında ama Osmanlı İmparatorluğu'nda geçen bir dizi.", "Cyberpunk 2077 evreninde geçen bir dedektiflik hikayesi."],
                ["Bu fikrin hedef kitlesi kimler olmalı?", "Bu projeyi hayata geçirmek için hangi kaynaklara ihtiyaç var?", "Bu konsepti benzerlerinden ayıran en önemli özellik ne?"]
            ],
            structure: (parts) => `${parts[0]} ${parts[1]} ${parts[2]}`
        },
        hellprompts: {
            parts: [
                ["Şu durumda hissedilen duyguyu derinlemesine anlat:", "Şu psikolojik korku durumunu detaylı olarak incele:", "Şu anın yarattığı varoluşsal tedirginliği tasvir et:", "Şu gerçekliğin uyandırdığı kozmik dehşeti betimle:", "Şu rahatsız edici keşfin yarattığı duyguları analiz et:", "Şu deneyimi yaşayan birinin zihinsel durumunu anlat:", "Şu olguyla ilişkili derin korkuyu keşfet:", "Şu senaryonun yarattığı varoluşsal krizi tasvir et:", "Şu durumun tetiklediği derin tedirginliği anlat:", "Şu olgunun neden olduğu zihinsel çözülmeyi betimle:"],
                ["yansımanızın kendi niyetleri olduğunu fark ettiğinizde.", "anılarınızın bilinmeyen bir güç tarafından değiştirildiğini anladığınızda.", "fizik yasalarının algınızın sınırlarında çözülmeye başladığını gördüğünüzde.", "sessizliğin kendisinin kötü niyetli bir varlık haline geldiğini hissettiğinizde.", "kendi düşüncelerinizin artık tamamen size ait olmadığını fark ettiğinizde.", "zaman döngülerinin mükemmel sıfırlanmadığını ve hatalar bıraktığını keşfettiğinizde.", "gerçekliğin kırılgan bir yapı olduğuna dair kanıtlarla karşılaştığınızda.", "unutulmuş rüyalarla beslenen parazitik bir varlığın varlığını hissettiğinizde.", "insan bilincinin evrimsel bir kaza olduğunu anladığınızda.", "sıradan desenlerde gizlenmiş kozmik bir gerçeği fark ettiğinizde.", "H.P. Lovecraft'ın bir karakterinin zihninde bir gün geçirdiğinde.", "Stephen King romanındaki bir kasabada mahsur kaldığında."],
                ["Bu farkındalık, benlik algınızı nasıl parçalara ayırır?", "Bu durum, nasıl derin ve kaçınılmaz bir paranoyaya yol açar?", "Bu keşif, algıladığınız gerçekliği nasıl tamamen çökertir?", "Bu deneyim, her sessiz anı nasıl bir korku kaynağına dönüştürür?", "Bu farkındalık, kimlik ve dış etki arasındaki sınırları nasıl bulanıklaştırır?"]
            ],
            structure: (parts) => `${parts[0]} ${parts[1]} ${parts[2]}`
        }
    }
};

// Support both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = optimizedPrompts;
}
