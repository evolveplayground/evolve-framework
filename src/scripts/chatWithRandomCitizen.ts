// Import necessary services and modules
import { AIIntegration } from '../services/AIIntegration';
import { DataStorage } from '../services/DataStorage';
import { UserInteraction } from './interactWithUser';
import { User } from '../models/User';

// Main function to initiate a random or specific chat
async function initiateRandomInteraction() {
  // Initialize services
  const aiIntegration = new AIIntegration();
  const dataStorage = new DataStorage();

  // Load stored data
  await dataStorage.initialize();

  // Retrieve command-line arguments for specific user identification
  const [givenName, surname] = process.argv.slice(2);
  const userList = await dataStorage.retrieveAllUsers();

  let selectedUser = null;

  // Check if specific user details are provided
  if (givenName && surname) {
    const completeName = `${givenName} ${surname}`;
    const matchedUser = userList.find(
      user => user.name.toLowerCase() === completeName.toLowerCase()
    );

    if (matchedUser) {
      selectedUser = new User(matchedUser);
      console.log(`User located: ${selectedUser.name}`);
    } else {
      console.log(
        `No user found with the name "${completeName}". Selecting a random user instead...`
      );
    }
  }

  // Default to a random user if no specific match is found
  if (!selectedUser) {
    const randomUser = userList[Math.floor(Math.random() * userList.length)];
    selectedUser = new User(randomUser);
    console.log(`Random user chosen: ${selectedUser.name}`);
  }

  // Initiate chat interaction
  const interaction = new UserInteraction(aiIntegration, dataStorage);
  await interaction.initiateChat(selectedUser.id);
}

// Execute the main function and handle any errors
initiateRandomInteraction().catch(console.error);

// Note: This script uses the "Evolve" framework.
// Repository link: https://github.com/evolveplayground/evolve-framework