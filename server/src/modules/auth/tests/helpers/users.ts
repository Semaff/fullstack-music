import { ChangePasswordDto } from "../../dto/change-password.dto";
import { SignInDto } from "../../dto/signin.dto";
import { SignUpDto } from "../../dto/signup.dto";
import { UpdateDto } from "../../dto/update.dto";
import { User } from "../../entities/user.entity";

export const mockedToken = `randomtoken123`;
export const hashedPassword = "hashedBob1!";

export const signUpDto: SignUpDto = {
  firstName: "Bob",
  lastName: "Bob",
  password: "Bob1!",
  email: "bob@example.com"
};

export const signInDto: SignInDto = {
  password: "Bob1!",
  email: "bob@example.com"
};

export const updateDto: UpdateDto = {
  firstName: "Bobik1!",
  lastName: "Bobik1!",
  email: "bobik@example.com"
};

export const changePasswordDto: ChangePasswordDto = {
  password: "Bobik1!"
};

export const users: User[] = [
  {
    id: 1,
    firstName: "Bob",
    lastName: "Bob",
    password: "hashedBob1!",
    email: "bob@example.com",
    albums: [],
    comments: [],
    playlists: [],
    tracks: []
  },
  {
    id: 2,
    firstName: "Bob2",
    lastName: "Bob2",
    password: "hashedBob2!",
    email: "bob2@example.com",
    albums: [],
    comments: [],
    playlists: [],
    tracks: []
  },
  {
    id: 3,
    firstName: "Bob3",
    lastName: "Bob3",
    password: "hashedBob3!",
    email: "bob3@example.com",
    albums: [],
    comments: [],
    playlists: [],
    tracks: []
  }
];
