/*
  Lista de projetos — odiogo.pt
  Ordem: do mais recente para o mais antigo.
  media: cada item é um vídeo ou uma imagem:
    { yt: 'ID do YouTube' }          → vídeo do YouTube
    { vimeo: 'ID do Vimeo' }          → vídeo do Vimeo
    { file: 'assets/....mp4' }        → vídeo alojado no site
    { img: 'assets/projetos/....jpg' } → fotografia / imagem
  cover: imagem de capa da prova (opcional; nos vídeos do YouTube usa-se o frame do YouTube).
  Projetos sem media ainda não aparecem no site.
*/
window.PROJECTS = [
  { id: 'lelabo', year: '2026', title: 'Le Labo — Another 13', type: ['Direção · spec ad', 'Direction · spec ad'], client: 'Pessoal', note: ['Spec ad, projeto pessoal.', 'Spec ad, personal project.'], cover: 'assets/lelabo_cover.jpg', media: [{ t: 'Le Labo — Another 13', file: 'assets/lelabo.mp4', poster: 'assets/lelabo_cover.jpg' }] },
  { id: 'lisboapt', year: '2026', title: 'Novo lisboa.pt', type: ['Edição · motion graphics', 'Editing · motion graphics'], client: 'CML', media: [] },
  { id: 'marchas', year: '2026', title: 'Evolução Visual das Marchas', type: ['Edição', 'Editing'], client: 'CML', media: [] },
  { id: 'celeste', year: '2026', title: 'Recordar Celeste dos Cravos', type: ['Edição', 'Editing'], client: 'CML', media: [] },
  { id: 'portugalia', year: '2025', title: '100 anos da Cervejaria Portugália', type: ['Edição', 'Editing'], client: 'CML', media: [{ t: '100 anos da Cervejaria Portugália', yt: 'qx57D4zZEbg' }] },
  { id: 'guardafreio', year: '2025', title: 'Ofícios de Lisboa — Guarda-freio', type: ['Edição', 'Editing'], client: 'CML', media: [] },
  { id: 'chilombo', year: '2025', title: 'Ofícios de Lisboa — Linda Chilombo', type: ['Edição', 'Editing'], client: 'CML', media: [] },
  { id: 'lisboetas', year: '2024', title: 'Lisboetas — Afonso Oliveira', type: ['Edição', 'Editing'], client: 'CML', media: [{ t: 'Lisboetas – Afonso Oliveira', yt: 'pOYhwCIDexk' }] },
  { id: 'lisboetas2', year: '2024', title: 'Lisboetas — Sadik Mohamed', type: ['Edição', 'Editing'], client: 'CML', media: [{ t: 'Lisboetas – Sadik Mohamed', yt: 'WYrvauhlJLk' }] },
  { id: 'oficios', year: '2024', title: 'Ofícios de Lisboa — Estofador Armindo Barata', type: ['Edição', 'Editing'], client: 'CML', media: [{ t: 'Ofícios de Lisboa – Estofador Armindo Barata', yt: '-3dw2zufaWQ' }] },
  { id: 'graffitis', year: '2024', title: 'Limpeza de Graffitis em Lisboa', type: ['Edição e filmagem', 'Editing & filming'], client: 'CML', note: ['Filmagem e edição para a Câmara Municipal de Lisboa.', 'Filming and editing for Lisbon City Council.'], media: [{ t: 'Limpeza de Graffitis em Lisboa', yt: 'qwQKZk-d_7Y' }] },
  { id: 'gulbenkian', year: '2023', title: 'Orquestra Gulbenkian no Vale do Silêncio', type: ['Edição · documentário', 'Editing · documentary'], client: 'CML', note: ['Edição de documentário para a Câmara Municipal de Lisboa.', 'Documentary editing for Lisbon City Council.'], media: [{ t: 'Orquestra Gulbenkian no Vale do Silêncio', yt: '77K2kli4gHE' }] },
  { id: 'casas', year: '2023', title: 'Casas Regionais em Lisboa', type: ['Edição · série', 'Editing · series'], client: 'CML', note: ['Série sobre as casas regionais de Lisboa, para a Câmara Municipal de Lisboa.', 'A series on Lisbon’s regional houses, for Lisbon City Council.'], media: [
    { t: 'Teaser “Casas Regionais em Lisboa”', yt: 'TSpxXLG4DAE' }, { t: 'Casa do Minho distinguida com Medalha de Mérito Cultural', yt: 'QMtzeBfVbWE' }, { t: 'Casa de Arcos de Valdevez', yt: '_0E4ibJ29Bk' }, { t: 'Casa de Castro Daire', yt: 'qY6mXsornHA' }, { t: 'Casa de Arganil', yt: 'jEaAPlugCUo' }] },
  { id: 'farmcode', year: '2020', title: 'FarmCode', type: ['Motion graphics', 'Motion graphics'], client: 'Associação LOCALS', media: [] },
  { id: 'hamlet', year: '2019', title: 'Hamlet', type: ['Poster · design', 'Poster · design'], client: 'Filho do Meio', media: [] },
  { id: 'china', year: '2019', title: 'China', type: ['Fotografia', 'Photography'], client: 'Pessoal', media: [] },
  { id: 'toquio', year: '2019', title: 'Tóquio', titleEN: 'Tokyo', type: ['Fotografia', 'Photography'], client: 'Pessoal', media: [] },
  { id: 'lx', year: '2018', title: 'LX State of Mind', type: ['Fotografia', 'Photography'], client: 'Pessoal', media: [] },
  { id: 'japao', year: '2017', title: 'Japão', titleEN: 'Japan', type: ['Fotografia', 'Photography'], client: 'Pessoal', media: [] },
  { id: 'roteiros', year: '2017', title: 'Roteiros pelos Territórios de Baixa Densidade', type: ['Vídeo · série', 'Video · series'], client: 'GOV', note: ['Série de vídeos para o Portal do Governo, a acompanhar o roteiro pelos territórios de baixa densidade.', 'A video series for the Government Portal, following the tour of Portugal’s low-density territories.'], media: [
    { t: 'Roteiros pelos Territórios de Baixa Densidade, Norte', yt: 'kcKa5bWWdk8' }, { t: 'Roteiro pelos Territórios de Baixa Densidade, Lisboa e Vale do Tejo', yt: 'USTKzAtHzwE' }, { t: 'Roteiros pelos Territórios de Baixa Densidade', yt: 'qTb5VnIJckY' }, { t: 'Balanço do Roteiro pelos Territórios de Baixa Densidade', yt: 'vIApqSr5K_c' }] },
  { id: 'transparencia', year: '2017', title: 'Portal da Transparência Municipal', type: ['Motion graphics', 'Motion graphics'], client: 'GOV', note: ['Vídeo em motion graphics para o Portal do Governo.', 'Motion graphics video for the Government Portal.'], media: [{ t: 'Portal da Transparência Municipal', yt: '-viR3P3OcBI' }] },
  { id: 'nascer', year: '2016', title: 'Nascer Cidadão com Cartão de Cidadão', type: ['Vídeo', 'Video'], client: 'GOV', note: ['Vídeo para o Portal do Governo.', 'Video for the Government Portal.'], media: [{ t: 'Nascer Cidadão com Cartão de Cidadão', yt: 'HJbN01Tcibg' }] },
  { id: 'ctt', year: '2016', title: 'Espaços do Cidadão nos CTT', type: ['Vídeo', 'Video'], client: 'GOV', note: ['Vídeo para o Portal do Governo.', 'Video for the Government Portal.'], media: [{ t: 'Espaços do Cidadão nos CTT', yt: 'IUtp2AxD18U' }] },
  { id: 'espacos', year: '2016', title: 'Espaços do Cidadão', type: ['Motion graphics', 'Motion graphics'], client: 'GOV', note: ['Vídeo em motion graphics para o Portal do Governo.', 'Motion graphics video for the Government Portal.'], media: [{ t: 'Espaços do Cidadão', yt: 'UvH7xaDsBfc' }] },
  { id: 'bali', year: '2016', title: 'Bali', type: ['Vídeo · fotografia', 'Video · photography'], client: 'Pessoal', media: [] },
  { id: 'singapura', year: '2016', title: 'Singapura', titleEN: 'Singapore', type: ['Fotografia', 'Photography'], client: 'Pessoal', media: [] },
  { id: 'nice', year: '2015', title: 'Nice est Nice', type: ['Fotografia', 'Photography'], client: 'Pessoal', media: [] },
  { id: 'kanimambo', year: '2014', title: 'Mission Kanimambo', type: ['Motion graphics', 'Motion graphics'], client: 'Dialogue', note: ['Motion designer na equipa da Dialogue.', 'Motion designer in the Dialogue team.'], media: [{ t: 'Mission Kanimambo', vimeo: '97147984' }] },
  { id: 'homeland', year: '2013', title: 'Homeland', type: ['Design', 'Design'], client: 'Pessoal', media: [] },
  { id: 'sovena', year: '2013', title: 'Sovena Group', type: ['Edição', 'Editing'], client: 'Dialogue · Sovena', note: ['Edição na equipa da Dialogue.', 'Editing in the Dialogue team.'], media: [{ t: 'Sovena Group', yt: 'hfaL8y1MVws' }] },
  { id: 'chronopost', year: '2013', title: 'Chronopost Predict', type: ['Motion graphics', 'Motion graphics'], client: 'Dialogue · Chronopost', note: ['Motion designer na equipa da Dialogue.', 'Motion designer in the Dialogue team.'], media: [{ t: 'Chronopost Predict', vimeo: '78078891' }] },
  { id: 'closely', year: '2012', title: 'Closely', type: ['Style frames', 'Style frames'], client: 'Pessoal', media: [] },
  { id: 'berlim', year: '2012', title: 'Berlim', titleEN: 'Berlin', type: ['Vídeo · fotografia', 'Video · photography'], client: 'Pessoal', media: [] },
  { id: 'invisible', year: '2012', title: 'Invisible Monsters', type: ['Style frames', 'Style frames'], client: 'Pessoal', media: [] },
  { id: 'amsterdam', year: '2010', title: 'Amsterdam', type: ['Fotografia', 'Photography'], client: 'Pessoal', media: [] }
];
