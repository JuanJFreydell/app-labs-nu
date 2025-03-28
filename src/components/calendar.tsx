import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  parseISO,
} from "date-fns";

interface Event {
  title: string;
  date: string; // ISO date string
}

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const getHeader = () => {
    return React.createElement(
      "div",
      { className: "calendar-header flex justify-between items-center mb-4" },
      React.createElement(
        "button",
        {
          className: "bg-red-600 p-2 rounded w-48 text-white",
          onClick: () => setCurrentMonth(addDays(currentMonth, -30)),
        },
        "Previous",
      ),
      React.createElement(
        "h2",
        { className: "text-xl font-bold" },
        format(currentMonth, "MMMM yyyy"),
      ),
      React.createElement(
        "button",
        {
          className: "bg-red-600 p-2 rounded w-48 text-white",
          onClick: () => setCurrentMonth(addDays(currentMonth, 30)),
        },
        "Next",
      ),
    );
  };

  const generateCalendar = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    const days: React.ReactElement[] = [];
    let day = startDate;

    while (day <= endDate) {
      const dailyEvents = events.filter((event) =>
        isSameDay(parseISO(event.date), day),
      );

      days.push(
        React.createElement(
          "div",
          {
            key: day.toISOString(),
            className:
              "day flex flex-col justify-start items-start p-2 border border-gray-200 h-24 w-40",
          },
          React.createElement(
            "div",
            { className: "text-sm font-bold" },
            format(day, "d"),
          ),
          ...dailyEvents.map((event, idx) =>
            React.createElement(
              "div",
              {
                key: `${event.date}-${idx}`,
                className: "event bg-blue-100 text-xs rounded mt-1 p-1 w-full",
              },
              event.title,
            ),
          ),
        ),
      );
      day = addDays(day, 1);
    }

    return React.createElement(
      "div",
      {
        className: "grid grid-cols-7 grid-rows-[repeat(6,minmax(0,1fr))] gap-2",
      },
      ...days,
    );
  };

  return React.createElement(
    "div",
    { className: "calendar p-4 bg-white shadow-lg rounded" },
    getHeader(),
    React.createElement(
      "div",
      {
        className: "grid grid-cols-7 text-center font-bold text-gray-500 mb-4",
      },
      React.createElement("div", null, "Sun"),
      React.createElement("div", null, "Mon"),
      React.createElement("div", null, "Tue"),
      React.createElement("div", null, "Wed"),
      React.createElement("div", null, "Thu"),
      React.createElement("div", null, "Fri"),
      React.createElement("div", null, "Sat"),
    ),
    generateCalendar(),
  );
};

export default Calendar;
