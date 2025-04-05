// src/components/Analytics.js
const Analytics = ({ userActions }) => {
    const painPoints = calculatePainPoints(userActions);
    
    return (
      <div className="analytics-panel">
        <h3>User Behavior Insights</h3>
        <div>Total Interactions: {userActions.length}</div>
        <div>Common Issues:
          {painPoints.map((item, i) => (
            <div key={i}>{item.element}: {item.count} occurrences</div>
          ))}
        </div>
      </div>
    );
  };