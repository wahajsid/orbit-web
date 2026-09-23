# Arabic review: website change plan (site-v5, 23 September 2026)

Every Arabic string below is a **new draft** written for the site-v5 round. Each is marked in the source with a code comment `AR-REVIEW`. Please review for accuracy, tone and Gulf business usage, then edit the source file named in each section (or send corrections and we will apply them).

Conventions kept: product and system names stay Latin (Hysaab Finance, Hysaab Practice, Hysaab Audit, Ibtidah, Xero, QuickBooks, Oblique Consult, Simpla); digits stay Latin; WhatsApp is واتساب in prose. Pages with no Arabic twin (/check, /audit, /hire) are linked in English and labelled (بالإنجليزية).

The five firm questions (section 9) are also marked `DRAFT: owner review` in English: the owner must approve the substance before the Arabic is finalised.

---

## 1. Header and navigation — `components/home/HomeHeader.tsx`

| English source | Arabic draft |
|---|---|
| Products | المنتجات |
| For finance teams | للفرق المالية |
| For firms | للمكاتب المهنية |
| Trust | الثقة |
| Resources | الموارد |
| Books Check (dropdown row, links to English /check) | فحص الدفاتر |
| Free (tag) | مجاني |
| Invoice checks (phone menu) | فحص الفواتير |
| Book a demo (main button) | احجز عرضًا تجريبيًا |

## 2. Footer — `components/FooterData.tsx`

| English source | Arabic draft |
|---|---|
| AI agents for finance teams and firms | وكلاء ذكاء اصطناعي للفرق المالية والمكاتب المهنية |
| Hysaab Finance (column head) | Hysaab Finance |
| Overview | نظرة عامة |
| Invoice checks | فحص الفواتير |
| Books Check, free | فحص الدفاتر مجانًا (بالإنجليزية) |
| For firms (column head) | للمكاتب المهنية |
| Hysaab Audit | Hysaab Audit (بالإنجليزية) |
| Ibtidah, finance hiring | Ibtidah، التوظيف في المالية (بالإنجليزية) |
| Trust | الثقة |
| Compliance | الامتثال (link added to the Company column) |
| Built by the team behind Oblique Consult. | بناه الفريق الذي يقف وراء Oblique Consult. |
| Visit Oblique Consult | زيارة Oblique Consult |

## 3. Shared components

**`components/hysaab/CtaBand.tsx`** (closing band on every inner page)

| English source | Arabic draft |
|---|---|
| Book a demo | احجز عرضًا تجريبيًا |

**`components/home/EnquiryForm.tsx`** (demo form on the homepage and contact page)

| English source | Arabic draft |
|---|---|
| Tell us about you. | أخبرنا عنك. |
| I am a… | أنا… |
| Select one | اختر واحدًا |
| Finance team | فريق مالي |
| Tax or advisory firm | مكتب ضرائب أو استشارات |
| Audit firm | مكتب تدقيق |
| Other | أخرى |
| Request a demo | اطلب عرضًا تجريبيًا |

**`lib/demo.ts`**: (opens in a new tab) → (يفتح في تبويب جديد) (screen-reader text; this wording already existed on the site).

**`components/hysaab/Demo.tsx`** (the five-beat replay, Arabic table)

| English source | Arabic draft |
|---|---|
| Al Noor Group · Dubai entity | مجموعة النور · كيان دبي |
| Rashid, a site manager in the Dubai entity, photographs a supplier invoice from his car. | يصوّر راشد، مدير موقع في كيان دبي، فاتورة مورّد من سيارته. |
| Rashid reads his entity’s numbers on his phone. Layla sends the group pack to the board. | يقرأ راشد أرقام كيانه على هاتفه. وترسل ليلى حزمة المجموعة إلى مجلس الإدارة. |
| Omar (was Noor): Slip requested from Omar / Ask Omar for the slip / petty-cash top-ups by Omar | طُلب الإيصال من عمر / اطلب الإيصال من عمر / تعبئة النثرية من عمر |
| For Rashid, Dubai entity: … owed to the entity 1.96m | لراشد، كيان دبي: … المستحق للكيان 1.96m |

## 4. Homepage — `app/ar/page.tsx`

| English source | Arabic draft |
|---|---|
| Title: AI Agents for Finance Teams and Firms in UAE & KSA \| Hysaab | وكلاء ذكاء اصطناعي للفرق المالية والمكاتب المهنية \| Hysaab |
| Description: AI agents do the finance work and your people review and approve. Hysaab Finance for finance teams; Hysaab Practice and Hysaab Audit for firms. | وكلاء الذكاء الاصطناعي يؤدون العمل المالي وفريقك يراجع ويعتمد. Hysaab Finance للفرق المالية، وHysaab Practice وHysaab Audit للمكاتب المهنية. |
| AI agents for finance teams and the firms that serve them | وكلاء ذكاء اصطناعي للفرق المالية وللمكاتب التي تخدمها |
| AI agents do the finance work. | وكلاء الذكاء الاصطناعي يؤدون العمل المالي. |
| Your people review and approve. (marker on “review and approve”) | وفريقك يراجع ويعتمد. (marker on «يراجع ويعتمد») |
| Built by accountants who ran the work first. For the UAE and Saudi Arabia. | بناه محاسبون أدّوا العمل بأنفسهم أولًا. للإمارات والسعودية. |
| I run a finance team | أدير فريقًا ماليًا |
| Agents handle payables, reconciliations, the close and reporting inside the ledger you already use. | يتولى الوكلاء الذمم الدائنة والمطابقات والإقفال والتقارير داخل النظام المحاسبي الذي تستخدمه بالفعل. |
| Check your books free | افحص دفاترك مجانًا |
| I run a firm | أدير مكتبًا مهنيًا |
| Hysaab Practice and Hysaab Audit | Hysaab Practice وHysaab Audit |
| Agents run tax checks, client engagements and the ISA audit file. Your partners make the calls. | يتولى الوكلاء الفحوص الضريبية وارتباطات العملاء وملف التدقيق وفق معايير ISA. والقرار لشركائك. |
| See how firms use it | شاهد كيف تستخدمه المكاتب |
| Evidence on every number. Approval on every decision that matters. Built in Dubai. | دليل على كل رقم. واعتماد على كل قرار مهم. صُنع في دبي. |
| Built on Oblique’s live client work since 2018 | مبني على عمل Oblique الحي مع العملاء منذ 2018 |
| Xero and QuickBooks today, more ledgers connecting | Xero وQuickBooks اليوم، وأنظمة أخرى قيد الربط |
| English and Arabic | بالإنجليزية والعربية |
| In-page nav: Products / For firms / Our story | المنتجات / للمكاتب المهنية / قصتنا |
| The products | المنتجات |
| Three products. One way of working. | ثلاثة منتجات. وطريقة عمل واحدة. |
| Each works on its own. All three keep the same rule: agents prepare the work, and a person makes the call. | كل منتج يعمل وحده. والثلاثة تلتزم القاعدة نفسها: الوكلاء يُعدّون العمل، وشخص يتخذ القرار. |
| For finance teams · Early access | للفرق المالية · وصول مبكر |
| AI agents for accounting and reporting. | وكلاء ذكاء اصطناعي للمحاسبة والتقارير. |
| Payables, reconciliations, the close and the reporting pack, prepared inside the ledger you already use. Your team reviews and approves. | الذمم الدائنة والمطابقات والإقفال وحزمة التقارير، تُعدّ داخل النظام المحاسبي الذي تستخدمه بالفعل. وفريقك يراجع ويعتمد. |
| Explore Hysaab Finance / Practice / Audit | استكشف Hysaab Finance / Practice / Audit |
| For tax and advisory firms · Coming soon | لمكاتب الضرائب والاستشارات · قريبًا |
| AI agents for tax and advisory firms. | وكلاء ذكاء اصطناعي لمكاتب الضرائب والاستشارات. |
| Hundreds of VAT and CT checks on every return, treatments drawn from your own precedents, and the firm’s admin running itself around the work. | مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات في كل إقرار، ومعالجات مستمدة من سوابقك، والأعمال الإدارية للمكتب تدير نفسها من حول العمل. |
| For licensed audit firms · Coming soon | لمكاتب التدقيق المرخّصة · قريبًا |
| The ISA file, run by engines, concluded by your partners. | ملف التدقيق وفق معايير ISA، تديره المحركات ويستنتجه شركاؤك. |
| Every journal scored, samples designed and evaluated, schedules tied out. A licensed partner concludes and signs; Hysaab never does. | كل قيد مُقيَّم، والعينات مصممة ومُقيَّمة، والجداول مطابَقة. يستنتج شريك مرخّص ويوقّع؛ ولا يوقّع Hysaab أبدًا. |
| Hiring into finance? Meet Ibtidah | توظّف في المالية؟ تعرّف على Ibtidah |
| Documents and data arrive. | المستندات والبيانات تصل. |
| Invoices, receipts, bank lines and questions, by WhatsApp, email or upload. No report builder to learn. | فواتير وإيصالات وأسطر بنكية وأسئلة، عبر واتساب أو البريد أو الرفع. لا حاجة لتعلّم أداة تقارير. |
| One night on a group’s books. | ليلة واحدة على دفاتر مجموعة. |
| What the agents did between nine in the evening and a quarter to seven, and the one question they left for Layla. Illustrative data. | ما فعله الوكلاء بين التاسعة مساءً والسابعة إلا ربعًا صباحًا، والسؤال الوحيد الذي تركوه لليلى. بيانات توضيحية. |
| Feed row: received a WhatsApp photo from Rashid, Dubai entity. | استلم صورة عبر واتساب من راشد، كيان دبي. |
| Illustrative scenario. Al Noor Group runs four entities across Dubai and Riyadh. Layla is Group CFO. Her team of twelve closes the books every month. The scenario and the numbers are examples, not results. | سيناريو توضيحي. تدير مجموعة النور أربعة كيانات بين دبي والرياض. ليلى المديرة المالية للمجموعة، ويُقفل فريقها المكوّن من اثني عشر شخصًا الدفاتر كل شهر. السيناريو والأرقام أمثلة، لا نتائج. |
| Close verification block (new on the Arabic page): ALL SQUARE. | كل شيء مُسوّى. |
| September close / loose ends | إقفال سبتمبر / البنود المعلّقة |
| A rare occasion when zero is the number you want. | مناسبة نادرة يكون فيها الصفر هو الرقم الذي تريده. |
| The receipts are in. The bank matches. Every item on September’s close checklist is complete. | الإيصالات وصلت. والبنك مطابَق. وكل بند في قائمة إقفال سبتمبر مكتمل. |
| Show me the proof | أرني الدليل |
| 43 / 43 checks complete · Illustrative completed close · Sample data | 43 / 43 فحصًا مكتملًا · إقفال مكتمل توضيحي · بيانات تجريبية |
| Read our commitments on data and control | اقرأ التزاماتنا بشأن البيانات والتحكم |
| For firms | للمكاتب المهنية |
| Your firm sells judgement. The agents carry the file. | مكتبك يبيع الحكم المهني. والوكلاء يحملون الملف. |
| For tax and advisory firms, and for licensed audit firms. Take either product on its own, or both together. | لمكاتب الضرائب والاستشارات، ولمكاتب التدقيق المرخّصة. استخدم أيًّا من المنتجين وحده، أو كليهما معًا. |
| Hysaab Practice filing workbench (capture title, alt, caption, pending line) | منصة الإقرارات في Hysaab Practice / … مع الفحوص على إقرار ضريبة القيمة المضافة / …، بيانات تجريبية / لقطة منصة الإقرارات في Hysaab Practice قيد الإعداد. |
| Hundreds of VAT and CT checks on every return | مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات في كل إقرار |
| Treatments proposed from your firm’s own precedents | معالجات مقترحة من سوابق مكتبك |
| A red-team review before a partner approves | مراجعة نقدية قبل أن يعتمد الشريك |
| See Hysaab Practice / See Hysaab Audit | شاهد Hysaab Practice / شاهد Hysaab Audit (بالإنجليزية) |
| Hysaab Audit journal-entry testing (alt) | اختبار قيود اليومية في Hysaab Audit: كل قيد مُقيَّم وفق ثلاثين معيارًا، مع المعايير التي انطبقت على كل قيد. بيانات تجريبية. |
| Journal-entry testing on a seeded engagement, sample data. | اختبار قيود اليومية على ارتباط تجريبي، بيانات تجريبية. |
| Every journal scored, not a sample picked by eye | كل قيد مُقيَّم، لا عينة تُختار بالنظر |
| Samples designed, selected and evaluated in code | العينات تُصمَّم وتُختار وتُقيَّم بالشيفرة |
| A licensed partner concludes and signs. Hysaab never does. | يستنتج شريك مرخّص ويوقّع. ولا يوقّع Hysaab أبدًا. |
| Your clients stay yours. Read our commitments to firms | عملاؤك يبقون عملاءك. اقرأ التزاماتنا تجاه المكاتب |
| We run it with you. | ندير العمل معك. |
| Oblique’s accountants run the queue and prepare the close with you, using Hysaab every day. For mid-sized and larger companies. | يدير محاسبو Oblique قائمة العمل ويجهّزون الإقفال معك، مستخدمين Hysaab كل يوم. للشركات المتوسطة والكبيرة. |
| Where Hysaab comes from | من أين جاء Hysaab |
| We ran the work before we built the product. | أدّينا العمل قبل أن نبني المنتج. |
| Hysaab grew out of the tax and accounting work Oblique Consult has done for Gulf businesses since 2018, and is engineered with Simpla. We built the agents for the work we used to do by hand. | نشأ Hysaab من أعمال الضرائب والمحاسبة التي تؤديها Oblique Consult لشركات الخليج منذ 2018، وهندسته Simpla. بنينا الوكلاء للعمل الذي كنا نؤديه بأيدينا. |
| Oblique Consult card: Tax, accounting and advisory. Dubai, since 2018. Its accountants run the managed service. | ضرائب ومحاسبة واستشارات. دبي، منذ 2018. محاسبوها يديرون الخدمة المُدارة. |
| Simpla card: Tax and accounting AI. Dubai. The engineers behind Hysaab. | ذكاء اصطناعي للضرائب والمحاسبة. دبي. المهندسون وراء Hysaab. |
| Read the full story | اقرأ القصة كاملة |
| Not ready for a demo? | لست مستعدًا لعرض تجريبي؟ |
| Check your books free. | افحص دفاترك مجانًا. |
| Connect Xero or QuickBooks. See what Hysaab finds in about a minute. Read-only. (+ the tool is in English) | اربط Xero أو QuickBooks، وشاهد ما يجده Hysaab في دقيقة تقريبًا. للقراءة فقط. الأداة بالإنجليزية. |
| Check my books | افحص دفاتري |
| Book a demo. | احجز عرضًا تجريبيًا. |
| Tell us who you are and what takes too long. We will show you where Hysaab fits. | أخبرنا من أنت وما الذي يستغرق وقتًا أطول مما ينبغي. وسنريك أين يناسبك Hysaab. |
| Prefer to pick a time yourself? Choose a slot in our calendar | تفضّل أن تختار الموعد بنفسك؟ اختر موعدًا في تقويمنا |

## 5. Trust — `app/ar/trust/page.tsx` and `lib/trust.ts`

| English source | Arabic draft |
|---|---|
| Title: Trust: Hysaab’s Commitments to Firms and Finance Teams | الثقة: التزامات Hysaab تجاه المكاتب المهنية والفرق المالية |
| Description: Where Hysaab draws its commercial boundaries with firms, and how it handles your data: separate tenants, logged agent actions and no training on your data. | أين يرسم Hysaab حدوده التجارية مع المكاتب المهنية، وكيف يتعامل مع بياناتك: مساحات منفصلة، وسجل لكل إجراء يتخذه الوكلاء، ولا تدريب على بياناتك. |
| Our commitments to firms and finance teams. | التزاماتنا تجاه المكاتب المهنية والفرق المالية. |
| What we will and will not do with your clients, and how we look after your data. Written as commitments you can hold us to. | ما الذي سنفعله وما لن نفعله مع عملائك، وكيف نرعى بياناتك. مكتوبة التزاماتٍ يمكنك محاسبتنا عليها. |
| How we look after your data | كيف نرعى بياناتك |
| Part one · Commercial boundaries | الجزء الأول · الحدود التجارية |
| Your clients stay yours. Five questions firms ask. | عملاؤك يبقون عملاءك. خمسة أسئلة تطرحها المكاتب. |
| Firms thinking about Hysaab Practice or Hysaab Audit ask us these first. Here are our answers. | المكاتب التي تفكر في Hysaab Practice أو Hysaab Audit تسألنا هذه الأسئلة أولًا. وهذه إجاباتنا. |
| Part two · Data controls | الجزء الثاني · ضوابط البيانات |
| How we look after your data. For firms and finance teams alike. | كيف نرعى بياناتك. للمكاتب والفرق المالية على السواء. |
| The same five commitments hold in Hysaab Finance, Hysaab Practice and Hysaab Audit. | الالتزامات الخمسة نفسها تسري في Hysaab Finance وHysaab Practice وHysaab Audit. |
| What these are: These are commitments we make to every customer. They are not a third-party certification. Ask us for the detail behind any of them. | ما هذه الالتزامات: هذه التزامات نقطعها لكل عميل، وليست شهادة من طرف ثالث. اسألنا عن التفاصيل وراء أيٍّ منها. |
| Read further / The rest of the rules. / How the tax checks, approvals and period locks work, and what this website does with your details. | للمزيد / بقية القواعد. / كيف تعمل الفحوص الضريبية والاعتمادات وأقفال الفترات، وما الذي يفعله هذا الموقع ببياناتك. |
| Compliance card | الضرائب والضوابط / الامتثال / قواعد ضريبة القيمة المضافة وضريبة الشركات في الإمارات وقواعد ZATCA تُختبر قبل أي ترحيل، مع الاعتمادات وأقفال الفترات. / اقرأ صفحة الامتثال |
| FAQ card | إجابات مباشرة / الأسئلة الشائعة / ما يفعله Hysaab من تلقاء نفسه، وما لا يفعله أبدًا، وكم يكلّف. / اقرأ الأسئلة الشائعة |
| Privacy card | هذا الموقع / إشعار الخصوصية / ما يجمعه هذا الموقع حين تراسلنا أو تحجز عرضًا تجريبيًا، وما لا يجمعه. الإشعار بالإنجليزية. / اقرأ إشعار الخصوصية |
| Band: Ask us the hard questions. / Bring your partners, your IT lead or your compliance officer. We will walk through each commitment on this page and show you where it lives in the product. | اسألنا الأسئلة الصعبة. / أحضر شركاءك أو مسؤول تقنية المعلومات أو مسؤول الامتثال لديك. سنمرّ معكم على كل التزام في هذه الصفحة ونريكم أين يوجد في المنتج. |

**Data controls (`lib/trust.ts`, `DATA_CONTROLS.ar`)**

| English source | Arabic draft |
|---|---|
| Each customer’s data kept apart. We keep every firm’s and every company’s data in its own tenant. Each request is checked against the customer it belongs to, so one customer never sees another’s records. | بيانات كل عميل منفصلة. نحفظ بيانات كل مكتب وكل شركة في مساحة مستقلة خاصة بها. ويُفحص كل طلب مقابل العميل الذي ينتمي إليه، فلا يرى أي عميل سجلات عميل آخر. |
| Every agent action logged. We log every action an agent takes: what it did, on which record, with what evidence, and who approved it. | كل إجراء يتخذه وكيل مُسجَّل. نسجّل كل إجراء يتخذه أي وكيل: ما الذي فعله، وعلى أي سجل، وبأي دليل، ومن اعتمده. |
| No training on your data. We never use your data to train AI models. Your records are used to do your work and nothing else. | لا تدريب على بياناتك. لا نستخدم بياناتك أبدًا لتدريب نماذج الذكاء الاصطناعي. سجلاتك تُستخدم لإنجاز عملك ولا شيء غيره. |
| Credentials kept encrypted. We keep the credentials that connect Hysaab to your ledger and your other systems encrypted, and we never display them in the workspace. | بيانات الاعتماد مشفّرة. نحفظ بيانات الاعتماد التي تربط Hysaab بدفتر أستاذك وأنظمتك الأخرى مشفّرة، ولا نعرضها أبدًا في مساحة العمل. |
| Staff access only with your written permission. Our staff do not open your workspace without your written permission. When they do, for support you have asked for, every access is logged. | وصول الموظفين بإذن كتابي منك فقط. لا يفتح موظفونا مساحة عملك دون إذن كتابي منك. وحين يفعلون ذلك لتقديم دعم طلبته، يُسجَّل كل وصول. |

## 6. The five questions firms ask — `lib/trust.ts` (`FIRM_QUESTIONS.ar`, also DRAFT: owner review)

| English source | Arabic draft |
|---|---|
| Do you compete with us for clients? | هل تنافسوننا على العملاء؟ |
| No. Hysaab Practice and Hysaab Audit are software for your firm. We do not use your workspace to find, contact or sell to your clients. Oblique Consult, the advisory firm our founders also run, has no access to your workspace or your client list. | لا. Hysaab Practice وHysaab Audit برنامجان لمكتبكم. لا نستخدم مساحة عملكم للبحث عن عملائكم أو التواصل معهم أو البيع لهم. وOblique Consult، المكتب الاستشاري الذي يديره مؤسسونا أيضًا، لا يملك أي وصول إلى مساحة عملكم أو قائمة عملائكم. |
| Who owns our client data and the client relationships? | لمن تعود بيانات عملائنا وعلاقاتنا معهم؟ |
| You do. The client records, files and working papers you put into Hysaab belong to your firm, and we process them only to run the service for you. Each client relationship is yours. Hysaab deals with your clients only where you invite them into the workspace, and only to exchange work with your firm. | لكم. سجلات العملاء وملفاتهم وأوراق العمل التي تضعونها في Hysaab ملك لمكتبكم، ولا نعالجها إلا لتشغيل الخدمة لكم. وكل علاقة مع عميل هي علاقتكم. ولا يتعامل Hysaab مع عملائكم إلا حيث تدعونهم إلى مساحة العمل، ولتبادل العمل مع مكتبكم فقط. |
| Will you contact our clients? | هل ستتواصلون مع عملائنا؟ |
| Not for our own purposes. Anything your clients receive through Hysaab is sent by your firm, when a person at your firm presses send. We do not market to your clients or approach them for work. | ليس لأغراضنا. كل ما يصل إلى عملائكم عبر Hysaab يرسله مكتبكم، حين يضغط شخص في مكتبكم زر الإرسال. ولا نسوّق لعملائكم ولا نعرض عليهم أي عمل. |
| Can we keep our own brand, or white-label Hysaab? | هل نحتفظ بعلامتنا التجارية، أو نقدّم Hysaab باسمنا؟ |
| Your clients deal with your firm, not with us. Reports, letters and returns you prepare in Hysaab go out as your firm’s work. How far the client-facing screens can carry your own brand is agreed with each firm before you start, and we will tell you plainly what is available today. | عملاؤكم يتعاملون مع مكتبكم لا معنا. والتقارير والخطابات والإقرارات التي تُعدّونها في Hysaab تخرج بوصفها عمل مكتبكم. أما مدى ظهور علامتكم على الشاشات التي يراها العملاء فيُتفق عليه مع كل مكتب قبل البدء، وسنقول لكم بوضوح ما هو متاح اليوم. |
| What happens to our data if we leave? | ماذا يحدث لبياناتنا إذا غادرنا؟ |
| You can take a full export of your records and documents before you go. After that we delete your firm’s data from the service on the timetable in your agreement, keeping only what the law requires us to keep, and we confirm in writing when it is done. | يمكنكم أخذ نسخة كاملة من سجلاتكم ومستنداتكم قبل المغادرة. وبعد ذلك نحذف بيانات مكتبكم من الخدمة وفق الجدول الزمني في اتفاقيتكم، ولا نحتفظ إلا بما يلزمنا القانون بالاحتفاظ به، ونؤكد لكم كتابيًا عند الانتهاء. |

## 7. Hysaab Finance — `app/ar/accounting/page.tsx`

The six module blocks reuse the reviewed translations from the old /ar/product page. New:

| English source | Arabic draft |
|---|---|
| Title: Hysaab Finance: AI Agents for Accounting in the UAE and KSA | Hysaab Finance: وكلاء ذكاء اصطناعي للمحاسبة في الإمارات والسعودية |
| Description: AI agents for accounting and reporting: payables, receivables, the ledger, the close, documents and tax, prepared by agents and approved by your finance team. | وكلاء ذكاء اصطناعي للمحاسبة والتقارير: الذمم الدائنة والمدينة ودفتر الأستاذ والإقفال والمستندات والضرائب، يُعدّها الوكلاء ويعتمدها فريقك المالي. |
| Hysaab Finance · for finance teams | Hysaab Finance · للفرق المالية |
| Hysaab Finance. AI agents for accounting and reporting. | Hysaab Finance. وكلاء ذكاء اصطناعي للمحاسبة والتقارير. |
| Agents prepare the payables, the reconciliations, the close and the reporting pack inside the ledger you already use. Your team reviews and approves. | يُعدّ الوكلاء الذمم الدائنة والمطابقات والإقفال وحزمة التقارير داخل النظام المحاسبي الذي تستخدمه بالفعل. وفريقك يراجع ويعتمد. |
| Check your books free (English tool) | افحص دفاترك مجانًا (بالإنجليزية) |
| 01 · What does it do? / Six parts, one set of books. Prepared for you. Decided by you. | 01 · ماذا يفعل؟ / ستة أجزاء، ومجموعة دفاتر واحدة. يُعدّ لك، وتقرره أنت. |
| 02 · Who is it for? / Finance teams with more than one set of books. | 02 · لمن هو؟ / للفرق المالية التي تدير أكثر من مجموعة دفاتر. |
| From a single company to a group of entities across the UAE and Saudi Arabia, run by your own team or with Oblique’s accountants alongside. | من شركة واحدة إلى مجموعة كيانات في الإمارات والسعودية، يديرها فريقك أو يعمل معه محاسبو Oblique. |
| Multi-entity close / Every entity closes on its own checklist. / Switch between entities in one workspace. Each keeps its own books, its own close checklist and its own period lock, and the same approval rules hold in every one of them. | إقفال متعدد الكيانات / كل كيان يُقفل على قائمته الخاصة. / تنقّل بين الكيانات في مساحة عمل واحدة. لكل كيان دفاتره وقائمة إقفاله وقفل فترته، وقواعد الاعتماد نفسها تسري عليها جميعًا. |
| Group reporting / One pack for the group, traced to each entity. / Consolidate the entities and rebuild the management pack from locked ledgers. Each movement is explained in a sentence and traced back to its entry and its document. | تقارير المجموعة / حزمة واحدة للمجموعة، متتبَّعة إلى كل كيان. / وحّد الكيانات وأعد بناء حزمة الإدارة من دفاتر مقفلة. كل حركة مشروحة في جملة ومتتبَّعة إلى قيدها ومستندها. |
| One workspace, any shape / One business or five. One currency or five. One language or two. / Switch entities, consolidate, and turn the whole workspace to Arabic, right to left. | مساحة عمل واحدة، بأي شكل / شركة واحدة أو خمس. عملة واحدة أو خمس. لغة واحدة أو لغتان. / تنقّل بين الكيانات، ووحّدها، وحوّل مساحة العمل كلها إلى العربية، من اليمين إلى اليسار. |
| Arabic capture alt and caption | مساحة عمل Hysaab بالعربية، من اليمين إلى اليسار. بيانات تجريبية. / مساحة العمل نفسها بالعربية، من اليمين إلى اليسار. بيانات تجريبية. |
| 03 · How are supplier invoices checked? / Invoice checks, before you claim the VAT. | 03 · كيف تُفحص فواتير الموردين؟ / فحص الفواتير، قبل أن تطالب بالضريبة. |
| Every supplier invoice is read, its sums are redone in code and it is tested against the UAE and Saudi tax-invoice rules. A missing TRN, a wrong rate, a duplicate or a supplier whose TRN has changed is held with the reason and the article it fails. | تُقرأ كل فاتورة مورد، ويُعاد حسابها بالشيفرة، وتُختبر وفق قواعد الفاتورة الضريبية في الإمارات والسعودية. رقم تسجيل ضريبي مفقود، أو نسبة خاطئة، أو فاتورة مكررة، أو مورد تغيّر رقمه الضريبي: كلها تُحجز مع السبب والمادة التي لم تستوفها. |
| Invoice checks are part of Hysaab Finance. Follow one invoice from the inbox to a claim you can defend. | فحص الفواتير جزء من Hysaab Finance. تابع فاتورة واحدة من البريد إلى مطالبة يمكنك الدفاع عنها. |
| 04 · How does it work? / Documents in. Work prepared. Decisions with you. / Seventy seconds of the agents at work, below. The full walkthrough goes from a document arriving to a locked period. | 04 · كيف يعمل؟ / المستندات تصل. والعمل يُعدّ. والقرار معك. / سبعون ثانية من عمل الوكلاء، أدناه. والجولة الكاملة تمتد من وصول المستند إلى فترة مقفلة. |
| 05 · What stays with you? / The same three rules hold on every screen. Our commitments on data and control set out the rest. | 05 · ما الذي يبقى معك؟ / القواعد الثلاث نفسها تسري على كل شاشة. والتزاماتنا بشأن البيانات والتحكم تبيّن الباقي. |
| 06 · What does it cost? / No charge per user. We confirm the scope and the fee in writing before you start. | 06 · كم يكلّف؟ / لا رسوم لكل مستخدم. نؤكد النطاق والرسوم كتابةً قبل أن تبدأ. |
| Self-serve · your team runs it / From USD 199 a month / The agents prepare the work; your team reviews, approves and closes. One connected accounting system, unlimited people. / See pricing | الخدمة الذاتية · فريقك يديرها / من USD 199 شهريًا / يُعدّ الوكلاء العمل، وفريقك يراجع ويعتمد ويقفل. نظام محاسبي واحد متصل، وعدد غير محدود من الأشخاص. / شاهد الأسعار |
| Managed · we run it with you / Scoped to your books / Oblique’s accountants run the queue… For mid-sized and larger companies. | الخدمة المُدارة · ندير العمل معك / تُسعَّر وفق نطاق دفاترك / يدير محاسبو Oblique قائمة العمل ويجهّزون الإقفال معك، مستخدمين Hysaab كل يوم. للشركات المتوسطة والكبيرة. |

## 8. Hysaab Practice — `app/ar/firms/page.tsx`

The whole page is new Arabic (the previous /ar/firms described the retired "services OS"). Key strings:

| English source | Arabic draft |
|---|---|
| Title: Hysaab Practice: AI Agents for Tax and Advisory Firms | Hysaab Practice: وكلاء ذكاء اصطناعي لمكاتب الضرائب والاستشارات |
| Description | Hysaab Practice يدير العمل الضريبي لمكاتب الضرائب والاستشارات: مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات، ومعالجات من سوابق مكتبك، ومراجعة قبل التقديم. |
| For tax and advisory firms | لمكاتب الضرائب والاستشارات |
| Hysaab Practice. AI agents for tax and advisory firms. | Hysaab Practice. وكلاء ذكاء اصطناعي لمكاتب الضرائب والاستشارات. |
| Hero lede | يتولى الوكلاء العمل الضريبي: مئات الفحوص لضريبة القيمة المضافة وضريبة الشركات، ومعالجات مستمدة من سوابق مكتبك، ومراجعة نقدية قبل تقديم أي شيء. والقرار لشركائك. ويعمل Hysaab Audit على ملف التدقيق بجانبه. |
| Start with the tax work (hero link) | ابدأ بالعمل الضريبي |
| The tax work first / Every return checked before a partner signs it. | العمل الضريبي أولًا / كل إقرار مفحوص قبل أن يوقّعه الشريك. |
| Three tax rows (hundreds of checks; precedents; red-team review) | see `app/ar/firms/page.tsx`, section `#tax-work` |
| And the firm runs itself around it / Nine areas of the firm. One system underneath. | ويدير المكتب نفسه من حوله / تسعة مجالات في المكتب. ونظام واحد تحتها. |
| The nine areas, three items each | see `AREAS` in `app/ar/firms/page.tsx` (27 items) |
| What it replaces (list) | ما يحل محله: أداة إدارة المكتب، والبريد المشترك، … وملف الموارد البشرية. |
| Hysaab Audit section (3 cards, note) | see section `hw-block--sage` |
| How the AI is allowed to work (6 cards) | see section `hw-block--dark` |
| Five questions firms ask / Your clients stay yours. Here is where we draw the line. | خمسة أسئلة تطرحها المكاتب / عملاؤك يبقون عملاءك. وهنا نرسم الحد. |
| Why we built it / Built inside a working Gulf tax firm. (2 paragraphs + promise) | لماذا بنيناه / بُني داخل مكتب ضرائب خليجي عامل. |
| Band: Book a demo / Give your people their judgement back. / Hysaab Practice opens to a small group… | احجز عرضًا تجريبيًا / أعد إلى فريقك وقته للحكم المهني. / يفتح Hysaab Practice أبوابه أولًا لمجموعة صغيرة… |

Glossary choices to confirm: "red-team review" → مراجعة نقدية; "precedents" → سوابق; "tie-out" → مطابقة; "workbench" → منصة عمل; "tenant" → مساحة مستقلة.

## 9. About — `app/ar/about/page.tsx`

| English source | Arabic draft |
|---|---|
| Title: About Hysaab: We Ran the Work Before We Built It | عن Hysaab: أدّينا العمل قبل أن نبني المنتج |
| Description | Hysaab شركة مستقلة، بناها في دبي الفريق الذي يقف وراء Oblique Consult، وهندستها Simpla. ومحاسبو Oblique يديرون الخدمة المُدارة. |
| We ran the work before we built the product. | أدّينا العمل قبل أن نبني المنتج. |
| Hero lede | بُني Hysaab في دبي على يد محاسبين أدّوا بأنفسهم الإقفال الشهري وإقرارات ضريبة القيمة المضافة واستفسارات الهيئة الاتحادية للضرائب، لعملائهم، قبل أن يصبح أي من ذلك برنامجًا. |
| Story paragraphs 2 and 3 (Oblique since 2018; we wrote down how we work) | see section 1 of the page |
| How we are organised / A separate company. The same people. + 4 rows | كيف ننتظم / شركة مستقلة. والأشخاص أنفسهم. |
| The founders / Accountants and engineers. At the same table. | المؤسسون / محاسبون ومهندسون. على الطاولة نفسها. |
| The products / One way of working. Three products and a sister. + 4 cards | المنتجات / طريقة عمل واحدة. ثلاثة منتجات ومنتج شقيق. |
| Built by the team behind Oblique Consult. | بناه الفريق الذي يقف وراء Oblique Consult. |

## 10. Pricing — `app/ar/pricing/page.tsx`

| English source | Arabic draft |
|---|---|
| Title: Hysaab Pricing: Self-serve from USD 199, Managed and Firms | أسعار Hysaab: خدمة ذاتية من 199 دولارًا، ومُدارة، وللمكاتب |
| Description | الخدمة الذاتية من 199 دولارًا شهريًا. خدمة مُدارة تُسعَّر وفق نطاق دفاترك. وHysaab Practice وHysaab Audit للمكاتب: رسوم إعداد واشتراك شهري. |
| Self-serve, managed, or for firms. The fee follows the work, never the number of logins. | خدمة ذاتية، أو مُدارة، أو للمكاتب المهنية. الرسوم تتبع العمل، لا عدد من يسجّلون الدخول. |
| Three ways in | ثلاث طرق للبدء |
| From USD 199 a month | من USD 199 شهريًا |
| We run it with you / Scoped to your books | ندير العمل معك / تُسعَّر وفق نطاق دفاترك |
| For mid-sized and larger companies and groups. Oblique’s accountants run the queue and prepare the close with you, using Hysaab every day. | للشركات المتوسطة والكبيرة والمجموعات. يدير محاسبو Oblique قائمة العمل ويجهّزون الإقفال معك، مستخدمين Hysaab كل يوم. |
| For firms / Setup fee plus a monthly subscription | للمكاتب المهنية / رسوم إعداد واشتراك شهري |
| For tax and advisory firms and licensed audit firms. Take either product on its own, or both together. | لمكاتب الضرائب والاستشارات ومكاتب التدقيق المرخّصة. استخدم أيًّا من المنتجين وحده، أو كليهما معًا. |
| Firm card bullets (Practice; Audit; setup then subscription; your clients stay yours) | see `TIERS[2]` |
| Band body (books or firm) and "For finance teams, the plans differ…" | see the page |

## 11. Other pages

- **`app/ar/invoice/page.tsx`**: title فحص فواتير الموردين قبل المطالبة بالضريبة \| Hysaab Finance; eyebrow and band kicker Hysaab Finance · فحص الفواتير; band body; hero link كيف يعمل فحص الفواتير; two capture alt texts; "hysaab invoice" replaced by Hysaab Finance in the description and lede.
- **`app/ar/compliance/page.tsx`**: new note بياناتك: كيف نرعى بياناتك، وأين نرسم الحدود مع المكاتب المهنية وعملائها، مبيّن في صفحة الثقة.
- **`app/ar/faq/page.tsx`**: the launch answer no longer shows a date: يفتح Hysaab أبوابه لعملاء جدد قريبًا. لا تحتاج إلى الانتظار لتتحدث إلينا: احجز عرضًا تجريبيًا أو أخبر الفريق عن دفاترك الآن…; the pricing answer: والخدمة المُدارة تُسعَّر وفق نطاق دفاترك: يعمل محاسبو Oblique على الاستثناءات معك ويجهّزون كل إقفال، مستخدمين Hysaab كل يوم.
- **`app/ar/how-it-works/page.tsx`**: والخدمة المُدارة، مع محاسبي Oblique، تُسعَّر وفق نطاق دفاترك.
