const fs = require('fs');
const path = require('path');

const updates = {
  en: {
    ai: [
      [
        'Map out a cognitive agent that',
        'Outline a digital assistant designed to',
      ],
      ['analyzes emotions in real time', 'streamlines complex workflows'],
      ['reshaping human collaboration', 'driving next-level innovation'],
      ['Highlight ethical implications.', 'Include possible safeguards.'],
    ],
    crazy: [
      ['Create a bizarre encounter where', 'Plan a surreal event in which'],
      ['time flows backward', 'every object is alive'],
      ['confounding all logic', 'sparking endless curiosity'],
      ['Keep the pacing frenetic.', 'End with a comedic twist.'],
    ],
    educational: [
      ['Describe the fundamentals of', 'Give a walkthrough for'],
      ['renewable energy systems', 'basic coding principles'],
      ['through step-by-step guidance', 'with short quizzes'],
      ['Include a quick recap.', 'Offer practice exercises.'],
    ],
    hellprompts: [
      ['Portray the silence before', 'Recall the night when'],
      ['the walls started bleeding', 'shadows consumed the light'],
      ['leaving echoes forever', 'until despair reigned'],
      ['Keep the mood oppressive.', 'End with a lingering fear.'],
    ],
    ideas: [
      ['Think up a creative solution using', 'Draft a concept built around'],
      ['sustainable materials', 'mobile banking'],
      ['with community support', 'for rapid growth'],
      ['Discuss marketing channels.', 'Mention scalability.'],
    ],
    image: [
      ['Draft a stencil-style graphic of', 'Generate a pixel art version of'],
      ['a bustling market under the stars', 'a playful cat in astronaut gear'],
      ['with a bright pastel palette.', 'with dramatic shadow play.'],
      ['Keep edges crisp.', 'Add subtle textures.'],
    ],
    inspiring: [
      ['Picture a moment when', 'Reflect on a journey where'],
      ['courage leads to change', 'kindness sparks unity'],
      ['encouraging self-belief', 'that brings lasting joy'],
      ['Share with heartfelt tone.', 'Close on a hopeful note.'],
    ],
    mindBlowing: [
      ['Visualize a dawn when', 'Speculate about a future where'],
      ['dreams alter reality', 'memories can be traded'],
      ['Would morals shift?', 'How might laws change?'],
      ['Imagine immediate impacts.', 'Consider the paradoxes.'],
    ],
    perspective: [
      ['From a micro perspective,', 'Through the voice of a rival,'],
      ['we perceive justice,', 'we analyze tradition,'],
      ['to challenge assumptions,', 'seeking common ground'],
      ['Keep the tone neutral.', 'Encourage open dialogue.'],
    ],
    productivity: [
      ['Set clear priorities to', 'Outline a feedback loop to'],
      ['increase accountability', 'save valuable time'],
      ['with measurable milestones', 'while staying flexible'],
      ['Share quick wins.', 'Focus on action steps.'],
    ],
    video: [
      ['Conceptualize a teaser trailer about', 'Plan a time-lapse sequence of'],
      ['a city awakening at dawn', 'a daring rescue gone wrong'],
      ['What transition styles fit best?', 'How will captions enhance it?'],
      ['Sync audio perfectly.', 'Keep scenes concise.'],
    ],
  },
  tr: {
    ai: [
      [
        'Böyle bir bilişsel ajan tasarla ki',
        'Şöyle bir dijital asistanı kurgula ki',
      ],
      ['duyguları anlık analiz eden', 'karmaşık iş akışlarını sadeleştiren'],
      [
        'insan işbirliğini yeniden şekillendiren',
        'yeni nesil yeniliğe yön veren',
      ],
      ['Etik sonuçları vurgula.', 'Olası güvenlik önlemlerini ekle.'],
    ],
    crazy: [
      ['Tuhaf bir karşılaşma yarat ki', 'Sürreal bir olay planla ki'],
      ['zaman geri aksın', 'her eşya canlansın'],
      ['tüm mantığı altüst ederek', 'bitmeyen merak uyandırarak'],
      ['Tempoyu yüksek tut.', 'Komik bir final yap.'],
    ],
    educational: [
      ['Temellerini açıkla:', 'Şu konuda adım adım rehber ver:'],
      ['yenilenebilir enerji sistemleri', 'temel kodlama prensipleri'],
      ['adım adım yol göstererek', 'kısa sınavlarla'],
      ['Hızlı bir özet ekle.', 'Uygulama egzersizleri sun.'],
    ],
    hellprompts: [
      ['Sessizlikten önceki anı tasvir et', 'O geceyi hatırla ki'],
      ['duvarlar kanamaya başladığında', 'gölgeler ışığı yuttuğunda'],
      ['sadece yankılar kalana dek', 'umutsuzluk hükmedene kadar'],
      ['Havanın baskıcı kalmasını sağla.', 'Bitirdiğinde korku sürsün.'],
    ],
    ideas: [
      [
        'Şu malzemeyle yaratıcı bir çözüm düşün',
        'Şunun etrafında bir konsept hazırla',
      ],
      ['sürdürülebilir malzemeler', 'mobil bankacılık'],
      ['topluluk desteğiyle', 'hızlı büyüme hedefiyle'],
      ['Pazarlama kanallarını tartış.', 'Ölçeklenebilirliği belirt.'],
    ],
    image: [
      [
        'Şunun izometrik bir çizimini yap:',
        'Şunun düşük poli bir modelini oluştur:',
      ],
      [
        'yıldızlar altında hareketli bir pazar',
        'astronot kıyafetli sevimli bir kedi',
      ],
      ['parlak pastel tonlarla.', 'dramatik gölgelerle.'],
      ['Kenarlara netlik kazandır.', 'Hafif dokular ekle.'],
    ],
    inspiring: [
      ['Şöyle bir anı hayal et ki', 'Şöyle bir yolculuğu düşün ki'],
      ['cesaret değişimi getiriyor', 'naziklik birliği ateşliyor'],
      ['özgüveni teşvik eden', 'kalıcı sevinç getiren'],
      ['Samimi bir dille paylaş.', 'Umutlu bir sonla bitir.'],
    ],
    mindBlowing: [
      ['Şöyle bir şafak düşün ki', 'Şöyle bir gelecek varsay ki'],
      ['rüyalar gerçeği değiştiriyor', 'anıların takas edildiği'],
      ['Ahlak nasıl değişirdi?', 'Yasalar nasıl şekillenirdi?'],
      ['Anında etkileri hayal et.', 'Paradoksları düşün.'],
    ],
    perspective: [
      ['Mikro bir bakışla,', 'Bir rakibin sesiyle,'],
      ['adaleti algılarız,', 'geleneği analiz ederiz,'],
      ['varsayımları sorgulamak için,', 'ortak payda arayarak'],
      ['Tarzı tarafsız tut.', 'Açık diyaloğu teşvik et.'],
    ],
    productivity: [
      ['Şu öncelikleri belirleyerek', 'Geri bildirim döngüsü kurarak'],
      ['sorumluluğu artır', 'değerli zamanı tasarruf et'],
      ['ölçülebilir adımlarla', 'esnek kalarak'],
      ['Hızlı kazanımları paylaş.', 'Eylem adımlarına odaklan.'],
    ],
    video: [
      [
        'Şunu anlatan bir tanıtım fragmanı kurgula',
        'Şu zaman atlamalı sekansı planla',
      ],
      ['şehrin şafakta uyanışı', 'ters giden cesur bir kurtarma'],
      ['Hangi geçişler en uygunu olur?', 'Altyazılar nasıl katkı sağlar?'],
      ['Sesi mükemmel eşleştir.', 'Sahneleri kısa tut.'],
    ],
  },
};

for (const [lang, cats] of Object.entries(updates)) {
  for (const [cat, partsToAdd] of Object.entries(cats)) {
    const file = path.join('prompts', lang, `${cat}.json`);
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.parts.forEach((arr, idx) => {
      arr.push(...partsToAdd[idx]);
    });
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
    console.log(`Updated ${file}`);
  }
}
