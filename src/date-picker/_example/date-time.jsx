import React from 'react';
import { DatePicker } from '@tencent/tdesign-react';

export default function YearDatePicker() {
  return (
    <div className="tdesign-demo-item--datepicker">
      <DatePicker theme="primary" mode="date" format="YYYY-MM-DD HH:mm:ss" enableTimePicker defaultValue="2021-05-01 11:30:20"></DatePicker>
    </div>
  );
}
