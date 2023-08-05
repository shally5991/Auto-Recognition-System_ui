export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  camera_id: string,
  number_plate: string,
}

const messages: Message[] = [
  {
    fromName: 'Matt Chorsey',
    subject: 'New event: Trip to Vegas',
    date: '9:32 AM',
    id: 0,
    camera_id: "0123",
    number_plate: "GJ-0123"
  },
  {
    fromName: 'Lauren Ruthford',
    subject: 'Long time no chat',
    date: '6:12 AM',
    id: 1,
    camera_id: "1123",
    number_plate: "GJ-1123"
  },
  {
    fromName: 'Jordan Firth',
    subject: 'Report Results',
    date: '4:55 AM',
    id: 2,
    camera_id: "2123",
    number_plate: "GJ-2123"

  },
  {
    fromName: 'Bill Thomas',
    subject: 'The situation',
    date: 'Yesterday',
    id: 3,
    camera_id: "3123",
    number_plate: "GJ-3123"
  },
  {
    fromName: 'Joanne Pollan',
    subject: 'Updated invitation: Swim lessons',
    date: 'Yesterday',
    id: 4,
    camera_id: "4123",
    number_plate: "GJ-4123"
  },
  {
    fromName: 'Andrea Cornerston',
    subject: 'Last minute ask',
    date: 'Yesterday',
    id: 5,
    camera_id: "5123",
    number_plate: "GJ-5123"
  },
  {
    fromName: 'Moe Chamont',
    subject: 'Family Calendar - Version 1',
    date: 'Last Week',
    id: 6,
    camera_id: "6123",
    number_plate: "GJ-6123"
  },
  {
    fromName: 'Kelly Richardson',
    subject: 'Placeholder Headhots',
    date: 'Last Week',
    id: 7,
    camera_id: "7123",
    number_plate: "GJ-7123"
  }
];

export const getMessages = () => messages;

export const getMessage = (id: number) => messages.find(m => m.id === id);
