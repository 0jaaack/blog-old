import styled from "styled-components";

const textMonth = {
  "01": "JANUARY",
  "02": "FEBRUARY",
  "03": "MARCH",
  "04": "APRIL",
  "05": "MAY",
  "06": "JUNE",
  "07": "JULY",
  "08": "AUGUST",
  "09": "SEPTEMBER",
  "10": "OCTOBER",
  "11": "NOVEMBER",
  "12": "DECEMBER",
};

function PostCellDate({ children }) {
  if (new Date(children).toString() === "Invalid Date") {
    return new Error("invalid date");
  }

  const [year, month] = new Date(children).toISOString().split("-");

  return (
    <DateText>
      {textMonth[month]}&nbsp;{year}
    </DateText>
  );
}

const DateText = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.lightgrey};
`;

export default PostCellDate;
