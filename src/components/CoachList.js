import React from 'react';

const CoachList = ({coaches}) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {coaches.filter((c) => c.active).map(coach => (
        <tr key={coach.id}>
          <td>
            {coach.name}
          </td>
          <td>
            {coach.email}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

CoachList.propTypes = {
  coaches: React.PropTypes.array.isRequired,
};

export default CoachList;
