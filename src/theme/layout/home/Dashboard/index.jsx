import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale, CategoryScale, LinearScale, PointElement, LineElement);

const Dashboard = () => {
  // Sample data for demonstration
  const [teamData, setTeamData] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [billableHours, setBillableHours] = useState(20); // Example billable hours in a week
  const totalBillableHours = 40; // Total billable hours in a week (for the circular progress chart)

  // Sample attendance data for the last 30 days (1 for attended, 0 for absent)
  const [attendanceData, setAttendanceData] = useState([]);
  
  // Sample notifications for the feed
  const [notifications, setNotifications] = useState([
    { message: "Jaya shared a file with you", time: "2 hours ago" },
    { message: "New team member joined today", time: "1 hour ago" },
    { message: "Project deadline extended", time: "5 hours ago" },
    { message: "Meeting scheduled for tomorrow", time: "3 hours ago" },
  ]);

  useEffect(() => {
    // Sample data that could be fetched from an API
    const team = [
      { name: 'John Doe', birthday: '2024-12-12', anniversary: '2024-12-04' },
      { name: 'Vaibhav Sharma', birthday: '2024-12-05', anniversary: '' },
    ];
    const holidaysList = ['2024-12-25', '2024-12-31'];
    const leaveList = [{ name: 'John Doe', date: '2024-12-04' }];
    const projectsList = [{ name: 'PCP Luke' }, { name: 'Oxy Plants' }];

    // Sort teamData by birthday and anniversary
    setTeamData(team.sort((a, b) => new Date(a.birthday) - new Date(b.birthday)));
    // Sort holidays
    setHolidays(holidaysList.sort((a, b) => new Date(a) - new Date(b)));
    // Sort leave data by date
    setLeaveData(leaveList.sort((a, b) => new Date(a.date) - new Date(b.date)));
    setProjects(projectsList);

    // Simulating attendance data for the past 30 days
    const generatedAttendance = Array.from({ length: 30 }, (_, i) => Math.random() > 0.2 ? 1 : 0); // 80% attendance
    setAttendanceData(generatedAttendance);
  }, []);

  // Billable Hours Circular Chart Data
  const billableChartData = {
    datasets: [
      {
        data: [billableHours, totalBillableHours - billableHours],
        backgroundColor: ['#81C784', '#E0E0E0'], // Light Green for billable, light gray for non-billable
        borderWidth: 0,
      },
    ],
  };

  // Attendance Line Chart Data
  const attendanceChartData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // 30 days
    datasets: [
      {
        label: 'Attendance',
        data: attendanceData,
        fill: false,
        borderColor: '#81C784', // Light green color for attendance line
        tension: 0.2,
      },
    ],
  };

  // Function to format date as "20 November 2024"
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', options); // Using 'en-GB' for "20 November 2024"
  };

  return (
    <Grid container spacing={3}>
      {/* Team Member Birthdays and Anniversaries */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'white' }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              backgroundColor: '#41c0b5',
              padding: '10px',
              color: '#2e3b4e',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Birthdays & Anniversaries
          </Typography>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#2e3b4e' }}>
            {teamData.map((member) => (
              <li key={member.name} style={{ marginBottom: '10px' }}>
                {member.anniversary === '2024-12-04' && (
                  <Typography variant="body1" color="primary">
                    🎉 Today {member.name}'s Anniversary! Let's Celebrate!
                  </Typography>
                )}
                {member.birthday === '2024-12-05' && (
                  <Typography variant="body1" color="secondary">
                    🎂 Today {member.name}'s Birthday! Let's Celebrate!
                  </Typography>
                )}
                {!member.anniversary && !member.birthday && (
                  <Typography variant="body1">
                    <strong>{member.name}</strong>: {member.birthday && `Birthday: ${formatDate(member.birthday)}`}
                    {member.anniversary && `, Anniversary: ${formatDate(member.anniversary)}`}
                  </Typography>
                )}
              </li>
            ))}
          </ul>
        </Paper>
      </Grid>

      {/* Holidays */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'white' }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              backgroundColor: '#f69f0b',
              padding: '10px',
              color: '#2e3b4e',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Upcoming Holidays
          </Typography>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#2e3b4e' }}>
            {holidays.map((holiday, idx) => (
              <li key={idx} style={{ marginBottom: '10px' }}>
                {formatDate(holiday)}
              </li>
            ))}
          </ul>
        </Paper>
      </Grid>

      {/* Who is on Leave Today */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'white' }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              backgroundColor: '#eef0f4',
              padding: '10px',
              color: '#2e3b4e',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Who is on Leave Today
          </Typography>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#2e3b4e' }}>
            {leaveData.map((leave) => (
              <li key={leave.name} style={{ marginBottom: '10px' }}>
                {leave.name} - {formatDate(leave.date)}
              </li>
            ))}
          </ul>
        </Paper>
      </Grid>

      {/* Ongoing Projects */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'white' }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              backgroundColor: '#f8db85',
              padding: '10px',
              color: '#2e3b4e',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Ongoing Projects
          </Typography>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#2e3b4e' }}>
            {projects.map((project, idx) => (
              <li key={idx} style={{ marginBottom: '10px' }}>
                {project.name}
              </li>
            ))}
          </ul>
        </Paper>
      </Grid>

      {/* Billable Hours */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'white' }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              backgroundColor: '#2b352e',
              padding: '10px',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Billable Hours This Week
          </Typography>
          <CircularProgress
            variant="determinate"
            value={(billableHours / totalBillableHours) * 100}
            size={120}
            thickness={4}
            style={{ color: '#81C784' }}
          />
          <Typography variant="h6" align="center" style={{ marginTop: '10px' }}>
            {billableHours} / {totalBillableHours} Hours
          </Typography>
        </Paper>
      </Grid>

      {/* Notifications Feed */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'white' }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              backgroundColor: '#f69f0b',
              padding: '10px',
              color: '#2e3b4e',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Feed
          </Typography>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#2e3b4e' }}>
            {notifications.map((notification, idx) => (
              <li key={idx} style={{ marginBottom: '10px' }}>
                {notification.message} <br />
                <span style={{ fontSize: '0.8rem', color: '#757575' }}>{notification.time}</span>
              </li>
            ))}
          </ul>
        </Paper>
      </Grid>

      {/* Monthly Attendance */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'white' }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              backgroundColor: '#f69f0b',
              padding: '10px',
              color: '#2e3b4e',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Monthly Attendance
          </Typography>
          <Line data={attendanceChartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
