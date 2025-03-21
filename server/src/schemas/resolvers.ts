import { AuthenticationError } from 'apollo-server-express';
import User from '../models/User';
import { signToken } from '../services/auth';

interface LoginArgs {
  email: string;
  password: string;
}

interface AddUserArgs {
  username: string;
  email: string;
  password: string;
}

interface BookDataArgs {
  bookData: {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image: string;
    link: string;
  };
}

interface RemoveBookArgs {
  bookId: string;
}

interface Context {
  user: {
    _id: string;
    username: string;
    email: string;
  } | null;
}

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await User.findById(context.user._id).populate('savedBooks');
    },
  },

  Mutation: {
    login: async (_parent: unknown, { email, password }: LoginArgs) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addUser: async (_parent: unknown, { username, email, password }: AddUserArgs) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (_parent: unknown, { bookData }: BookDataArgs, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to save a book.');
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: bookData } },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },

    removeBook: async (_parent: unknown, { bookId }: RemoveBookArgs, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to remove a book.');
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      return updatedUser;
    },
  },
};

export default resolvers;
