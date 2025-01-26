import React from "react";

const teamData = [
  {
    name: "Chef Sanjeev Kapoor",
    expertise: "Head Chef - Indian Cuisine",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL7zAI-3rpj70YJS09NZZFv7Kirje6ilc-MvoQDLTvs62A6W5cWFgLw8vcK9kaf4NUg7PTk1CbNdJXpqpWPqhsag", // Actual image
  },
  {
    name: "Chef Vikas Khanna",
    expertise: "North Indian and Tandoor Specialist",
    image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8lRtT7Ep2epOgWhPMJng0IZ_SDQIuLyeYiYA1G3TFWxugNPwof30wcNL_GhVY_H6yOmBl9yY2hhlm0EP64W_Flg", // Actual image
  },
  {
    name: "Chef Ranveer Brar",
    expertise: "Street Food and Chaat Expert",
    image:
      "https://blackhattalent.com/wp-content/uploads/2023/07/1672315886_ranveer-profile-1-cms.jpg", // Actual image
  },
];

const OurTeam = () => {
  return (
    <div className="container">
      <section className="our-team">
        <h2>Meet Our Chefs</h2>
        <div className="team-container">
          {teamData.map((member, index) => (
            <div key={index} className="team-member card">
              <img
                src={member.image}
                alt={member.name}
                className="team-member-img"
              />
              <h3>{member.name}</h3>
              <p>{member.expertise}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
