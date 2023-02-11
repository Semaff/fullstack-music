import { SignUpDto } from "../../../auth/dto/signup.dto";
import { User } from "../../../auth/entities/user.entity";

export const signUpDto: SignUpDto = {
  firstName: "Bob",
  lastName: "Bob",
  email: "bob@mail.ru",
  password: "Bob1!"
};

export const user: User = {
  id: 1,
  firstName: "Bob",
  lastName: "Bob",
  email: "bob@example.com",
  password: "Bob1!",
  albums: [],
  comments: [],
  playlists: [],
  tracks: []
};
