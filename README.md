# Schedulify - Smart Timetable Scheduler

A comprehensive timetable scheduling application for educational institutions built with React, Vite, and Tailwind CSS.

## Features

- **Multi-Role Support**: Admin, HOD, Teacher, and Student roles with different access levels
- **Automatic Timetable Generation**: Rule-based algorithm to generate conflict-free timetables
- **HOD Approval System**: Review and approve/reject generated timetables
- **Dark Mode**: Full dark mode support with theme persistence
- **Data Management**: Manage classrooms, subjects, teachers, and batches
- **Visual Analytics**: Subject distribution charts using Chart.js
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: All data persists in browser's local storage

## Project Structure

```
schedulify-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── AdminPanel.jsx
│   │   ├── Auth.jsx
│   │   ├── Dashboard.jsx
│   │   ├── HODPanel.jsx
│   │   ├── Modal.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── SubjectDistributionChart.jsx
│   │   ├── TimetableView.jsx
│   │   └── UserTimetablePanel.jsx
│   ├── utils/            # Utility functions
│   │   ├── constants.js
│   │   ├── storage.js
│   │   └── timetableGenerator.js
│   ├── styles/           # CSS styles
│   │   └── index.css
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd schedulify-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Default Login Credentials

### Admin
- Username: `admin`
- Password: `admin`
- Role: Admin

### HOD
- Username: `hod`
- Password: `hod`
- Role: HOD

### Teacher
- Username: `teacher`
- Password: `teacher`
- Role: Teacher

### Student
- Username: `student`
- Password: `student`
- Role: Student

## Usage Guide

### Admin Panel
1. **Manage Data**: Add classrooms, subjects, teachers, and batches
2. **Generate Timetable**: Use the automatic generator to create timetables
3. **View Generated Timetable**: Preview the generated schedule

### HOD Panel
1. Review the generated timetable
2. Approve or reject the timetable
3. Only approved timetables are visible to teachers and students

### Teacher/Student Panel
- View personalized timetables filtered by teacher name or student batch
- Access only after HOD approval

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Data visualization
- **Lucide React**: Icon library
- **LocalStorage API**: Data persistence

## Features in Detail

### Timetable Generation Algorithm
- Considers teacher availability
- Prevents batch conflicts
- Distributes workload evenly among teachers
- Avoids consecutive classes of the same subject
- Handles room allocation

### Theme Support
- Light and dark mode
- Persistent theme preference
- Smooth transitions

### Data Management
- CRUD operations for all entities
- Data validation
- Persistent storage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.

## Acknowledgments

- Built with modern web technologies
- Inspired by real-world educational scheduling needs
- Community feedback and contributions

---

**Note**: This application stores all data in the browser's local storage. Clearing browser data will reset the application to its default state.