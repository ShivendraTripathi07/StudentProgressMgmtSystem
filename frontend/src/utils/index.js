export const filterByDateRange = (
  data,
  days,
  dateField = "creationTimeSeconds"
) => {
  const cutoffTime = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;
  return data.filter((item) => item[dateField] >= cutoffTime);
};

export const getMaxRatingProblem = (submissions) => {
  const solvedProblems = submissions.filter(
    (sub) => sub.verdict === "OK" && sub.problem.rating
  );
  if (solvedProblems.length === 0) return null;
  return solvedProblems.reduce((max, current) =>
    current.problem.rating > (max.problem?.rating || 0) ? current : max
  );
};

export const countUniqueSolvedProblems = (submissions) => {
  const solved = submissions.filter((sub) => sub.verdict === "OK");
  const uniqueProblems = new Set(
    solved.map((sub) => `${sub.problem.contestId}-${sub.problem.index}`)
  );
  return uniqueProblems.size;
};

export const getAverageRating = (submissions) => {
  const solvedWithRating = submissions.filter(
    (sub) => sub.verdict === "OK" && sub.problem.rating
  );
  if (solvedWithRating.length === 0) return 0;
  const sum = solvedWithRating.reduce(
    (acc, sub) => acc + sub.problem.rating,
    0
  );
  return Math.round(sum / solvedWithRating.length);
};

export const getRatingBuckets = (submissions) => {
  const solved = submissions.filter(
    (sub) => sub.verdict === "OK" && sub.problem.rating
  );
  const buckets = {};

  solved.forEach((sub) => {
    const rating = sub.problem.rating;
    const bucket = Math.floor(rating / 400) * 400;
    const bucketLabel = `${bucket}-${bucket + 399}`;
    buckets[bucketLabel] = (buckets[bucketLabel] || 0) + 1;
  });

  return Object.entries(buckets)
    .map(([range, count]) => ({ range, count }))
    .sort((a, b) => parseInt(a.range) - parseInt(b.range));
};

export const getSubmissionHeatmapData = (submissions) => {
  const heatmapData = {};
  const today = new Date();

  // Initialize last 365 days
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    heatmapData[dateStr] = 0;
  }

  // Count submissions per day
  submissions.forEach((sub) => {
    const date = new Date(sub.creationTimeSeconds * 1000)
      .toISOString()
      .split("T")[0];
    if (heatmapData.hasOwnProperty(date)) {
      heatmapData[date]++;
    }
  });

  return heatmapData;
};
