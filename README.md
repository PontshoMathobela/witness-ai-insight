# JusticeLens: AI-Powered Witness Statement Analysis

![JusticeLens Banner](src/assets/hero-justice.jpg)

## 🏛️ Project Overview

**JusticeLens** is an AI-powered tool designed to analyze witness statements for detecting inconsistencies, emotional cues, potential deception, and psychological stress patterns. This project directly supports **UN Sustainable Development Goal 16 (Peace, Justice, and Strong Institutions)** by enhancing the reliability and fairness of witness statement analysis in judicial proceedings.

### 🎯 Key Features

- **Real-time Audio Recording**: Professional court recording interface with session management
- **Speech-to-Text Transcription**: Browser-based audio recording with transcription capabilities
- **CBCA Analysis**: Criteria-Based Content Analysis for credibility assessment
- **Reality Monitoring**: Psychological analysis for distinguishing experienced vs. imagined events
- **Professional Interface**: Justice-themed design with judicial authority aesthetics
- **Export Capabilities**: Multiple format support (PDF, JSON, HTML, TXT)
- **Ethical Framework**: Built-in legal disclaimers and ethical considerations

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** (build tool)
- **Tailwind CSS** (styling with custom design system)
- **shadcn/ui** (component library)
- **Radix UI** (accessibility-first primitives)
- **Lucide React** (icons)

### Key Libraries
- **React Hook Form + Zod** (forms/validation)
- **React Router** (routing)
- **Recharts** (data visualization)
- **React Query** (data fetching)
- **Sonner** (toast notifications)
- **@huggingface/transformers** (client-side AI models)

### Development Tools
- **ESLint** (linting)
- **PostCSS** (CSS processing)
- **TypeScript** (type safety)

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone <your-repository-url>
cd justice-lens

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── AnalysisForm.tsx       # Statement input interface
│   ├── AnalysisResults.tsx    # CBCA & RM analysis display
│   ├── Hero.tsx               # Landing page hero section
│   ├── LiveAnalysis.tsx       # Real-time analysis dashboard
│   ├── RecordingSession.tsx   # Audio recording interface
│   └── SDGSection.tsx         # SDG 16 information
├── pages/
│   ├── Index.tsx              # Main application page
│   └── NotFound.tsx           # 404 page
├── assets/                    # Static assets
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions
└── index.css                  # Global styles & design tokens
```

## 🔬 Analysis Methodology

### Criteria-Based Content Analysis (CBCA)
JusticeLens implements CBCA methodology with 8 key criteria:

1. **Logical Structure** - Coherence and flow of the narrative
2. **Quantity of Details** - Richness of specific information
3. **Contextual Embedding** - Integration with surrounding context
4. **Interactions** - Description of conversations and exchanges
5. **Unexpected Complications** - Mention of unplanned events
6. **Unusual Details** - Unique or distinctive elements
7. **Accurate Details** - Factual consistency and precision
8. **Related External Associations** - Connections to other events

### Reality Monitoring (RM)
The Reality Monitoring analysis evaluates 6 categories:

1. **Sensory Details** - Visual, auditory, tactile information
2. **Spatial Information** - Location and spatial relationships
3. **Temporal Information** - Time sequences and duration
4. **Affective Information** - Emotional content and feelings
5. **Clarity/Vividness** - Overall detail richness and clarity
6. **Cognitive Operations** - Thought processes and reasoning

## 🎨 Design System

JusticeLens features a sophisticated design system that conveys trust, professionalism, and judicial authority:

### Color Palette
- **Primary**: Deep judicial blue (#1e3a8a)
- **Secondary**: Professional gold accents
- **Background**: Clean whites and subtle grays
- **Semantic tokens**: Defined in `src/index.css`

### Typography
- **Headings**: Inter font family for professionalism
- **Body**: System fonts for readability
- **Monospace**: For technical data display

## 📊 Current Implementation Status

### ✅ Completed Features
- Professional landing page with SDG 16 messaging
- Real-time audio recording using Web Audio API
- Mock transcription and analysis pipeline
- CBCA and Reality Monitoring scoring frameworks
- Interactive dashboards with progress indicators
- Export functionality (CSV, JSON, PDF, HTML, TXT)
- Ethical disclaimers and legal safeguards
- Responsive design with mobile support

### 🔄 Next Development Phase
To implement full AI-powered analysis, backend integration is required:

- **Real Speech-to-Text**: Integration with Whisper or similar STT services
- **AI Model Deployment**: BERT/RoBERTa models for credibility analysis
- **Database Storage**: Session data and analysis history
- **Advanced Analytics**: Statistical validation and bias detection
- **Authentication**: Secure user access and session management

## 🔐 Ethics & Privacy

### Data Privacy
- All audio processing is done locally in the browser
- No data is transmitted without explicit user consent
- Sessions are temporary and not stored permanently
- GDPR and HIPAA compliance considerations built-in

### Ethical AI Principles
- **Transparency**: Clear explanation of analysis methods
- **Accountability**: Audit trails for all decisions
- **Fairness**: Bias detection and mitigation strategies
- **Human Oversight**: Tool supports, never replaces human judgment

### Legal Disclaimers
- Analysis results are supportive tools only
- Human legal expertise is required for all decisions
- Not a replacement for professional judgment
- Compliance with local judicial regulations required

## 🧪 Testing

### Unit Testing
```bash
# Run tests (when implemented)
npm run test
```

### Manual Testing Scenarios
1. **Audio Recording**: Test microphone permissions and recording functionality
2. **Statement Analysis**: Input various text samples for CBCA/RM analysis
3. **Export Functions**: Verify all export formats work correctly
4. **Responsive Design**: Test across different screen sizes
5. **Edge Cases**: Empty inputs, very long statements, special characters

## 🚀 Deployment

### Frontend Deployment
The application can be deployed to:
- **Vercel** (recommended for React apps)
- **Netlify** (static site hosting)
- **GitHub Pages** (for public repositories)

### Production Build
```bash
npm run build
# Outputs to dist/ directory
```

## 📈 Roadmap

### Phase 1: Foundation (Completed)
- [x] Professional UI/UX design
- [x] Audio recording interface
- [x] Mock analysis framework
- [x] Export functionality

### Phase 2: AI Integration (Next)
- [ ] Real speech-to-text integration
- [ ] BERT/RoBERTa model deployment
- [ ] Advanced NLP preprocessing
- [ ] Statistical validation

### Phase 3: Production Features
- [ ] User authentication
- [ ] Session management
- [ ] Advanced analytics
- [ ] Audit logging
- [ ] API integrations

### Phase 4: Deployment & Scale
- [ ] Cloud infrastructure
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Documentation completion

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use semantic commit messages
3. Maintain design system consistency
4. Include proper error handling
5. Write comprehensive tests

### Code Style
- ESLint configuration provided
- Prettier for code formatting
- TypeScript strict mode enabled
- Component-first architecture

## 📄 License

This project is developed for educational and research purposes in support of UN SDG 16. Please ensure compliance with local laws and regulations when using this tool in judicial contexts.

## 🔗 Related Resources

- [UN SDG 16 Documentation](https://sdgs.un.org/goals/goal16)
- [Criteria-Based Content Analysis Research](https://psycnet.apa.org/record/1989-32914-001)
- [Reality Monitoring Theory](https://psycnet.apa.org/record/1981-06726-001)
- [Ethical AI Guidelines](https://www.partnershiponai.org/)

## 📞 Support

For questions about implementation, ethical considerations, or technical support, please refer to the project documentation or open an issue in the repository.

---

**JusticeLens** - Advancing Peace, Justice, and Strong Institutions through AI-powered analysis.