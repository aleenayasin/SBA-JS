// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      },
    ],
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  // function getLearnerData(course, ag, submissions) {
  //   const results = [];
  
  //   const example_result = [
  //     {
  //       id: 125,
  //       avg: 0.985, // (47 + 150) / (50 + 150)
  //       1: 0.94, // 47 / 50
  //       2: 1.0, // 150 / 150
  //     },
  //     {
  //       id: 132,
  //       avg: 0.82, // (39 + 125) / (50 + 150)
  //       1: 0.78, // 39 / 50
  //       2: 0.833, // late: (140 - 15) / 150
  //     },
  //   ];
  
  //   // Parse submission data.
  //   console.log(`Submission Data:`, submissions );
  //   // Check to see if the submission was late; if so, deduct 10% of the maximum possible points.
  //   // Find existing data for this learner, if any.
  //   // If the learner already has data, add the new score to the existing data.
  //   // Calculate the average score for each learner and remove the extra data.
  
  //   //==== PUT CODE HERE =====//

   
  // }

  function getLearnerData(course, ag, submissions) {
    // Declare variables properly using let and const where appropriate.
    const results = [];

    try {
        for (const submission of submissions) {
            const { learner_id, assignment_id, submission: { submitted_at, score } } = submission;

            const assignment = ag.assignments.find(a => a.id === assignment_id);
            if (assignment) {
                if (new Date(submitted_at) > new Date(assignment.due_at)) {
                    const latePenalty = assignment.points_possible * 0.1;
                    console.log(`Late submission deduction for learner ${learner_id}, assignment ${assignment_id}: ${latePenalty}`);
                    submission.submission.score -= latePenalty;
                }

                let learnerData = results.find(data => data.id === learner_id);

                switch (learnerData) {
                    case undefined:
                        learnerData = { id: learner_id, avg: 0, scores: {} };
                        results.push(learnerData);
                        break;
                    default:
                        break;
                }

                if (assignment && assignment.points_possible !== 0) {
                    const assignmentScore = score / assignment.points_possible;
                    learnerData.scores[assignment_id] = assignmentScore;
                }
            }
        }

        for (const learnerData of results) {
            const assignmentWeights = ag.assignments.reduce((weights, assignment) => {
                weights[assignment.id] = assignment.points_possible;
                return weights;
            }, {});

            for (const assignment_id of Object.keys(learnerData.scores)) {
                if (assignmentWeights[assignment_id] === 0) {
                    console.log(`Warning: Assignment ${assignment_id} has points_possible set to 0.`);
                }
            }

            const totalWeightedScore = Object.keys(learnerData.scores).reduce((total, assignment_id) => {
                const assignmentScore = learnerData.scores[assignment_id];
                const assignmentWeight = assignmentWeights[assignment_id];
                total += assignmentScore * assignmentWeight;
                return total;
            }, 0);

            const totalWeight = Object.values(assignmentWeights).reduce((total, weight) => total + weight, 0);

            learnerData.avg = totalWeightedScore / totalWeight;
        }

        return results;
    } catch (error) {
        console.error("An error occurred:", error.message);
        return results;
    }
}


  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);