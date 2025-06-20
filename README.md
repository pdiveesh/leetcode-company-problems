# 🚀 LeetCode Company Problems Merger

An interactive React application to analyze, organize, and manage LeetCode problems from different tech companies. Perfect for interview preparation and coding practice tracking.

![LeetCode Company Problems](https://img.shields.io/badge/LeetCode-Problems-orange?style=for-the-badge&logo=leetcode)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.3-teal?style=for-the-badge&logo=tailwindcss)

## ✨ Features

- 🏢 **Multi-Company Support** - Track problems from Google, Amazon, Microsoft, Meta, and more
- 🔍 **Advanced Filtering** - Search by problem name, topic, difficulty, or company
- 📊 **Interactive Analytics** - Visual statistics and difficulty breakdowns
- 📤 **CSV Export** - Export filtered data for external analysis
- 🎯 **Topic Organization** - Problems grouped by algorithmic topics
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark Theme** - Easy on the eyes for long coding sessions
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development

## 🖥️ Live Demo

[View Live Application](https://YOUR_USERNAME.github.io/leetcode-company-problems)

## 📸 Screenshots

### Main Dashboard
*Interactive problem browser with company filtering*

### Topic View
*Expandable topic groups with difficulty indicators*

### Analytics View
*Visual breakdown of problems by difficulty and company*

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0 or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/leetcode-company-problems.git
   cd leetcode-company-problems
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
npm run preview
```

## 📝 Usage

### Adding Company Data

1. Click the "Add Data" button in the filters section
2. Enter data in the format:
   ```
   company_name
   DIFFICULTY|Problem Name|Topic1, Topic2, Topic3
   MEDIUM|Two Sum|Array, Hash Table
   HARD|Median of Two Sorted Arrays|Array, Binary Search
   ```
3. Click "Add Data" to merge with existing problems

### Filtering Problems

- **Search**: Type in the search bar to find specific problems or topics
- **Topic Filter**: Select a specific algorithmic topic
- **Difficulty Filter**: Filter by Easy, Medium, or Hard problems
- **Company Filter**: Show problems from specific companies

### Exporting Data

Click the "Export CSV" button to download your filtered dataset for external analysis or sharing.

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **GitHub Pages** - Free hosting for the live demo

## 📁 Project Structure

```
src/
├── components/
│   └── CompanyProblemsMerger.tsx    # Main application component
├── App.tsx                          # App wrapper
├── main.tsx                         # Application entry point
├── index.css                        # Global styles and Tailwind imports
└── vite-env.d.ts                   # Vite type definitions
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Ideas for Contributions

- Add more company datasets
- Implement problem difficulty prediction
- Add problem tags and categories
- Create data visualization charts
- Add problem solution links
- Implement local data persistence
- Add problem completion tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [LeetCode](https://leetcode.com) for providing the platform and problems
- [Lucide](https://lucide.dev) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Vite](https://vitejs.dev) for the amazing build tool

## 📞 Support

If you have any questions or need help getting started:

- 📧 Open an issue on GitHub
- 💬 Start a discussion in the repository
- ⭐ Star the repository if you find it helpful!

---

**Happy Coding!** 🎉

*Built with ❤️ for the coding interview community*