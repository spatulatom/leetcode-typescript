// Divide and  Conquer vs Binary Search 

// Divide and conquer is a problem-solving strategy that involves breaking a 
// problem into smaller sub-problems, solving each sub-problem independently, 
// and then combining their solutions to solve the original problem. Binary 
// search is a specific example of a divide-and-conquer algorithm. 
// Let's discuss both concepts and then relate them to JavaScript.

// Binary Search: 
export function binarySearch(arr:any, target:number) {
    // Base case: if the array is empty, the target is not present
    if (arr.length === 0) {
      return -1;
    }
  
    // Divide: find the middle index
    const mid = Math.floor(arr.length / 2);
  
    // Conquer: compare the middle element with the target
    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      // Search in the right half
      return binarySearch(arr.slice(mid + 1), target);
    } else {
      // Search in the left half
      return binarySearch(arr.slice(0, mid), target);
    }
  }
  
  // Example usage:
  const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const targetValue = 7;
  const result1 = binarySearch(sortedArray, targetValue);
  
  console.log(`Index of ${targetValue}: ${result1}`);
// 1. Divide: Compare the middle element of the array with the target value.
// 2. Conquer: If the middle element is equal to the target, you've found it. 
// If the target is smaller, 
// search in the left half of the array; if larger, search in the right half.
// 3. Combine: Repeat the process recursively until the target is found or the 
// search space is empty
  

// Divide and Conquer: finding the maximum element in an array
export function findMax(arr:any, start:any, end:any) :any{
    // Base case: if the array has only one element
    if (start === end) {
      return arr[start];
    }
  
    // Divide: find the middle index
    const mid = Math.floor((start + end) / 2);
  
    // Conquer: recursively find the maximum in the left and right subarrays
    const leftMax = findMax(arr, start, mid);
    const rightMax = findMax(arr, mid + 1, end);
  
    // Combine: return the maximum of the left and right subarrays
    return Math.max(leftMax, rightMax);
  }
  
  // Example usage:
  const array = [3, 7, 1, 25, 9, 5, 12];
  const maxElement = findMax(array, 0, array.length - 1);
  
  console.log("Maximum element:", maxElement);
  
// 1.Divide: We find the middle index to split the array into two halves.
// 2. Conquer: We recursively find the maximum element in the left and right subarrays.
// 3. Combine: We combine the results by comparing the maximum elements from the 
// left and right subarrays.
