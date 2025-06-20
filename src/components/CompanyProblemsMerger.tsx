import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, Filter, TrendingUp, Building, Code, ChevronDown, ChevronRight, ExternalLink, BarChart3, Layers, X, Plus } from 'lucide-react';

interface Problem {
  problem: string;
  difficulty: string;
  companies: string;
}

interface TopicGroup {
  topic: string;
  problems: Problem[];
  count: number;
}

interface ProcessedProblem {
  title: string;
  difficulty: string;
  topics: string[];
  companies: string[];
}



const CompanyProblemsMerger: React.FC = () => {
  const [mergedData, setMergedData] = useState<TopicGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [showAddData, setShowAddData] = useState(false);
  const [newDataInput, setNewDataInput] = useState('');

  // Raw data - Add your company data here in the format shown below
  const [rawData, setRawData] = useState({
    accenture: [
      ["MEDIUM", "Bulb Switcher", "Math, Brainteaser"],
      ["EASY", "Happy Number", "Hash Table, Math, Two Pointers"],
      ["EASY", "Two Sum", "Array, Hash Table"],
      ["EASY", "Climbing Stairs", "Math, Dynamic Programming, Memoization"],
      ["EASY", "Best Time to Buy and Sell Stock", "Array, Dynamic Programming"],
      ["EASY", "Palindrome Number", "Math"],
      ["MEDIUM", "Rotate Array", "Array, Math, Two Pointers"],
      ["EASY", "Roman to Integer", "Hash Table, Math, String"],
      ["MEDIUM", "Maximum Subarray", "Array, Divide and Conquer, Dynamic Programming"],
      ["MEDIUM", "Delete and Earn", "Array, Hash Table, Dynamic Programming"],
      ["EASY", "Sum of Values at Indices With K Set Bits", "Array, Bit Manipulation"],
      ["EASY", "Find Subsequence of Length K With the Largest Sum", "Array, Hash Table, Sorting, Heap (Priority Queue)"],
      ["EASY", "Maximum Area of Longest Diagonal Rectangle", "Array"],
      ["EASY", "Ant on the Boundary", "Array, Simulation, Prefix Sum"],
      ["EASY", "Count Tested Devices After Test Operations", "Array, Simulation, Counting"],
      ["EASY", "Permutation Difference between Two Strings", "Hash Table, String"],
      ["EASY", "Minimum Right Shifts to Sort the Array", "Array"],
      ["MEDIUM", "Reverse Integer", "Math"],
      ["MEDIUM", "Longest Palindromic Substring", "Two Pointers, String, Dynamic Programming"],
      ["MEDIUM", "Largest Number", "Array, String, Greedy, Sorting"],
      ["EASY", "Merge Sorted Array", "Array, Two Pointers, Sorting"],
      ["EASY", "Longest Common Prefix", "String, Trie"],
      ["MEDIUM", "Spiral Matrix", "Array, Matrix, Simulation"],
      ["HARD", "Shortest Palindrome", "String, Rolling Hash, String Matching, Hash Function"],
      ["EASY", "Sort Integers by The Number of 1 Bits", "Array, Bit Manipulation, Sorting, Counting"],
      ["MEDIUM", "Longest Substring Without Repeating Characters", "Hash Table, String, Sliding Window"],
      ["MEDIUM", "3Sum", "Array, Two Pointers, Sorting"],
      ["MEDIUM", "Find Peak Element", "Array, Binary Search"],
      ["MEDIUM", "Reverse Words in a String", "Two Pointers, String"],
      ["MEDIUM", "Perfect Squares", "Math, Dynamic Programming, Breadth-First Search"],
      ["MEDIUM", "Integer Break", "Math, Dynamic Programming"],
      ["EASY", "Majority Element", "Array, Hash Table, Divide and Conquer, Sorting, Counting"],
      ["EASY", "Valid Anagram", "Hash Table, String, Sorting"],
      ["EASY", "Valid Parentheses", "String, Stack"],
      ["MEDIUM", "Add Two Numbers", "Linked List, Math, Recursion"],
      ["EASY", "Plus One", "Array, Math"],
      ["MEDIUM", "Product of Array Except Self", "Array, Prefix Sum"],
      ["MEDIUM", "Container With Most Water", "Array, Two Pointers, Greedy"],
      ["EASY", "Fibonacci Number", "Math, Dynamic Programming, Recursion, Memoization"],
      ["EASY", "Remove Duplicates from Sorted Array", "Array, Two Pointers"],
      ["MEDIUM", "Count Primes", "Array, Math, Enumeration, Number Theory"],
      ["MEDIUM", "Nth Digit", "Math, Binary Search"],
      ["EASY", "Reverse Vowels of a String", "Two Pointers, String"],
      ["MEDIUM", "Find First and Last Position of Element in Sorted Array", "Array, Binary Search"],
      ["MEDIUM", "Merge Intervals", "Array, Sorting"],
      ["MEDIUM", "House Robber", "Array, Dynamic Programming"],
      ["MEDIUM", "Coin Change", "Array, Dynamic Programming, Breadth-First Search"],
      ["EASY", "Assign Cookies", "Array, Two Pointers, Greedy, Sorting"],
      ["EASY", "Pascal's Triangle", "Array, Dynamic Programming"],
      ["MEDIUM", "Longest Increasing Subsequence", "Array, Binary Search, Dynamic Programming"],
      ["EASY", "Perfect Number", "Math"],
      ["EASY", "Sort Array by Increasing Frequency", "Array, Hash Table, Sorting"],
      ["EASY", "Valid Palindrome", "Two Pointers, String"],
      ["EASY", "Is Subsequence", "Two Pointers, String, Dynamic Programming"],
      ["EASY", "Next Greater Element I", "Array, Hash Table, Stack, Monotonic Stack"],
      ["EASY", "Reverse Linked List", "Linked List, Recursion"],
      ["EASY", "Remove Element", "Array, Two Pointers"],
      ["HARD", "Candy", "Array, Greedy"],
      ["EASY", "Find the Index of the First Occurrence in a String", "Two Pointers, String, String Matching"],
      ["MEDIUM", "Unique Paths", "Math, Dynamic Programming, Combinatorics"],
      ["EASY", "Remove Duplicates from Sorted List", "Linked List"],
      ["MEDIUM", "Find the Winner of the Circular Game", "Array, Math, Recursion, Queue, Simulation"],
      ["MEDIUM", "Edit Distance", "String, Dynamic Programming"],
      ["EASY", "Sqrt(x)", "Math, Binary Search"],
      ["MEDIUM", "Koko Eating Bananas", "Array, Binary Search"],
      ["MEDIUM", "Peak Index in a Mountain Array", "Array, Binary Search"],
      ["EASY", "Contains Duplicate", "Array, Hash Table, Sorting"],
      ["EASY", "Max Consecutive Ones", "Array"],
      ["MEDIUM", "Rotate Image", "Array, Math, Matrix"],
      ["MEDIUM", "Next Permutation", "Array, Two Pointers"],
      ["EASY", "Average Value of Even Numbers That Are Divisible by Three", "Array, Math"],
      ["MEDIUM", "Single Number II", "Array, Bit Manipulation"],
      ["MEDIUM", "Search a 2D Matrix", "Array, Binary Search, Matrix"],
      ["MEDIUM", "Kth Largest Element in an Array", "Array, Divide and Conquer, Sorting, Heap (Priority Queue), Quickselect"],
      ["MEDIUM", "Daily Temperatures", "Array, Stack, Monotonic Stack"],
      ["MEDIUM", "Integer to Roman", "Hash Table, Math, String"],
      ["EASY", "Count Pairs Whose Sum is Less than Target", "Array, Two Pointers, Binary Search, Sorting"],
      ["MEDIUM", "Majority Element II", "Array, Hash Table, Sorting, Counting"],
      ["MEDIUM", "01 Matrix", "Array, Dynamic Programming, Breadth-First Search, Matrix"],
      ["EASY", "Substrings of Size Three with Distinct Characters", "Hash Table, String, Sliding Window, Counting"],
      ["EASY", "Count Operations to Obtain Zero", "Math, Simulation"],
      ["EASY", "Intersection of Two Linked Lists", "Hash Table, Linked List, Two Pointers"],
      ["EASY", "Maximum Depth of Binary Tree", "Tree, Depth-First Search, Breadth-First Search, Binary Tree"],
      ["EASY", "Excel Sheet Column Title", "Math, String"],
      ["MEDIUM", "Second Highest Salary", "Database"],
      ["MEDIUM", "Find Original Array From Doubled Array", "Array, Hash Table, Greedy, Sorting"],
      ["EASY", "N-th Tribonacci Number", "Math, Dynamic Programming, Memoization"],
      ["MEDIUM", "Basic Calculator II", "Math, String, Stack"],
      ["MEDIUM", "Pow(x, n)", "Math, Recursion"],
      ["EASY", "Number of Days Between Two Dates", "Math, String"],
      ["MEDIUM", "Ugly Number II", "Hash Table, Math, Dynamic Programming, Heap (Priority Queue)"],
      ["MEDIUM", "Group Anagrams", "Array, Hash Table, String, Sorting"],
      ["EASY", "How Many Numbers Are Smaller Than the Current Number", "Array, Hash Table, Sorting, Counting Sort"],
      ["MEDIUM", "Palindromic Substrings", "Two Pointers, String, Dynamic Programming"],
      ["EASY", "Min Cost Climbing Stairs", "Array, Dynamic Programming"],
      ["EASY", "Truncate Sentence", "Array, String"],
      ["HARD", "Median of Two Sorted Arrays", "Array, Binary Search, Divide and Conquer"],
      ["EASY", "Binary Search", "Array, Binary Search"],
      ["EASY", "Make The String Great", "String, Stack"],
      ["HARD", "Department Top Three Salaries", "Database"]
    ],
    cognizant: [
      ["MEDIUM", "Smallest Value of the Rearranged Number", "Math, Sorting"],
      ["EASY", "Palindrome Number", "Math"],
      ["EASY", "Count Subarrays of Length Three With a Condition", "Array"],
      ["EASY", "Fibonacci Number", "Math, Dynamic Programming, Recursion, Memoization"],
      ["EASY", "Two Sum", "Array, Hash Table"],
      ["MEDIUM", "Longest Palindromic Substring", "Two Pointers, String, Dynamic Programming"],
      ["EASY", "Valid Anagram", "Hash Table, String, Sorting"],
      ["EASY", "Valid Parentheses", "String, Stack"],
      ["MEDIUM", "Second Highest Salary", "Database"],
      ["MEDIUM", "Reverse Integer", "Math"],
      ["EASY", "Product Sales Analysis I", "Database"],
      ["MEDIUM", "Maximum Subarray", "Array, Divide and Conquer, Dynamic Programming"],
      ["MEDIUM", "Managers with at Least 5 Direct Reports", "Database"],
      ["EASY", "Remove Duplicates from Sorted Array", "Array, Two Pointers"],
      ["EASY", "Longest Common Prefix", "String, Trie"],
      ["EASY", "Students and Examinations", "Database"],
      ["EASY", "Rising Temperature", "Database"],
      ["MEDIUM", "Longest Substring Without Repeating Characters", "Hash Table, String, Sliding Window"],
      ["EASY", "Merge Sorted Array", "Array, Two Pointers, Sorting"],
      ["EASY", "Fizz Buzz", "Math, String, Simulation"],
      ["EASY", "Happy Number", "Hash Table, Math, Two Pointers"],
      ["MEDIUM", "Count Primes", "Array, Math, Enumeration, Number Theory"],
      ["MEDIUM", "3Sum", "Array, Two Pointers, Sorting"],
      ["EASY", "Merge Two Sorted Lists", "Linked List, Recursion"],
      ["EASY", "Move Zeroes", "Array, Two Pointers"],
      ["EASY", "Binary Search", "Array, Binary Search"],
      ["HARD", "Median of Two Sorted Arrays", "Array, Binary Search, Divide and Conquer"]
    ],
    capgemini: [
      ["EASY", "Two Sum", "Array, Hash Table"],
      ["EASY", "Number of Unique Subjects Taught by Each Teacher", "Database"],
      ["EASY", "Reverse Degree of a String", "String, Simulation"],
      ["EASY", "Remove Duplicates from Sorted Array", "Array, Two Pointers"],
      ["EASY", "Count Elements With Maximum Frequency", "Array, Hash Table, Counting"],
      ["EASY", "Best Time to Buy and Sell Stock", "Array, Dynamic Programming"],
      ["MEDIUM", "Add Two Numbers", "Linked List, Math, Recursion"],
      ["EASY", "Longest Common Prefix", "String, Trie"],
      ["MEDIUM", "Reverse Words in a String", "Two Pointers, String"],
      ["EASY", "Palindrome Number", "Math"],
      ["MEDIUM", "Rotate Array", "Array, Math, Two Pointers"],
      ["EASY", "Fibonacci Number", "Math, Dynamic Programming, Recursion, Memoization"],
      ["MEDIUM", "Nth Highest Salary", "Database"],
      ["EASY", "Valid Palindrome", "Two Pointers, String"],
      ["MEDIUM", "Longest Happy String", "String, Greedy, Heap (Priority Queue)"],
      ["HARD", "Median of Two Sorted Arrays", "Array, Binary Search, Divide and Conquer"],
      ["MEDIUM", "Group Anagrams", "Array, Hash Table, String, Sorting"],
      ["MEDIUM", "Exchange Seats", "Database"],
      ["EASY", "Valid Anagram", "Hash Table, String, Sorting"],
      ["EASY", "Move Zeroes", "Array, Two Pointers"],
      ["HARD", "Trapping Rain Water", "Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack"],
      ["MEDIUM", "Longest Substring Without Repeating Characters", "Hash Table, String, Sliding Window"],
      ["EASY", "Balanced Binary Tree", "Tree, Depth-First Search, Binary Tree"],
      ["MEDIUM", "Subarray Sum Equals K", "Array, Hash Table, Prefix Sum"]
    ],
    deloitte: [
      ["EASY", "Two Sum", "Array, Hash Table"],
      ["MEDIUM", "Change Null Values in a Table to the Previous Value", "Database"],
      ["HARD", "Merge k Sorted Lists", "Linked List, Divide and Conquer, Heap (Priority Queue), Merge Sort"],
      ["EASY", "Valid Parentheses", "String, Stack"],
      ["EASY", "Palindrome Number", "Math"],
      ["MEDIUM", "Longest Palindromic Substring", "Two Pointers, String, Dynamic Programming"],
      ["MEDIUM", "Managers with at Least 5 Direct Reports", "Database"],
      ["MEDIUM", "Reverse Integer", "Math"],
      ["MEDIUM", "Container With Most Water", "Array, Two Pointers, Greedy"],
      ["EASY", "Climbing Stairs", "Math, Dynamic Programming, Memoization"],
      ["MEDIUM", "Second Highest Salary", "Database"],
      ["MEDIUM", "Minimum Time to Repair Cars", "Array, Binary Search"],
      ["EASY", "Max Consecutive Ones", "Array"],
      ["MEDIUM", "Reverse Words in a String", "Two Pointers, String"],
      ["EASY", "Rising Temperature", "Database"],
      ["MEDIUM", "Kth Largest Element in an Array", "Array, Divide and Conquer, Sorting, Heap (Priority Queue), Quickselect"],
      ["MEDIUM", "Coin Change", "Array, Dynamic Programming, Breadth-First Search"],
      ["EASY", "Longest Common Prefix", "String, Trie"],
      ["MEDIUM", "Edit Distance", "String, Dynamic Programming"],
      ["EASY", "Reverse Linked List", "Linked List, Recursion"],
      ["EASY", "Article Views I", "Database"],
      ["EASY", "Find Customer Referee", "Database"],
      ["EASY", "Majority Element", "Array, Hash Table, Divide and Conquer, Sorting, Counting"],
      ["EASY", "Best Time to Buy and Sell Stock", "Array, Dynamic Programming"],
      ["EASY", "Pascal's Triangle", "Array, Dynamic Programming"],
      ["MEDIUM", "Merge Intervals", "Array, Sorting"]
    ],
    deltax: [
      ["EASY", "Roman to Integer", "Hash Table, Math, String"],
      ["MEDIUM", "Combination Sum II", "Array, Backtracking"],
      ["MEDIUM", "Longest Consecutive Sequence", "Array, Hash Table, Union Find"],
      ["MEDIUM", "Different Ways to Add Parentheses", "Math, String, Dynamic Programming, Recursion, Memoization"]
    ],
    ibm: [
      ["MEDIUM", "Exclusive Time of Functions", "Array, Stack"],
      ["MEDIUM", "Integer to Roman", "Hash Table, Math, String"],
      ["EASY", "Fizz Buzz", "Math, String, Simulation"],
      ["EASY", "Roman to Integer", "Hash Table, Math, String"],
      ["EASY", "Best Time to Buy and Sell Stock", "Array, Dynamic Programming"],
      ["EASY", "Two Sum", "Array, Hash Table"],
      ["MEDIUM", "Count Ways to Group Overlapping Ranges", "Array, Sorting"],
      ["MEDIUM", "Meeting Rooms II", "Array, Two Pointers, Greedy, Sorting, Heap (Priority Queue), Prefix Sum"],
      ["MEDIUM", "Minimum Operations to Make All Array Elements Equal", "Array, Binary Search, Sorting, Prefix Sum"],
      ["EASY", "Minimum Absolute Difference", "Array, Sorting"],
      ["MEDIUM", "Number of Divisible Triplet Sums", "Array, Hash Table"],
      ["MEDIUM", "Rotate Image", "Array, Math, Matrix"],
      ["MEDIUM", "Minimum Operations to Make Median of Array Equal to K", "Array, Greedy, Sorting"],
      ["MEDIUM", "Maximum Profitable Triplets With Increasing Prices I", "Array, Binary Indexed Tree, Segment Tree"],
      ["MEDIUM", "The kth Factor of n", "Math, Number Theory"],
      ["MEDIUM", "Find The First Player to win K Games in a Row", "Array, Simulation"],
      ["MEDIUM", "Activity Participants", "Database"],
      ["MEDIUM", "Taking Maximum Energy From the Mystic Dungeon", "Array, Prefix Sum"],
      ["MEDIUM", "Minimum Length of String After Operations", "Hash Table, String, Counting"],
      ["MEDIUM", "Find Occurrences of an Element in an Array", "Array, Hash Table"],
      ["HARD", "Find Products of Elements of Big Array", "Array, Binary Search, Bit Manipulation"],
      ["MEDIUM", "Count Vowel Strings in Ranges", "Array, String, Prefix Sum"],
      ["MEDIUM", "Sort the Students by Their Kth Score", "Array, Sorting, Matrix"],
      ["MEDIUM", "String Compression", "Two Pointers, String"],
      ["MEDIUM", "Minimum Levels to Gain More Points", "Array, Prefix Sum"],
      ["EASY", "Type of Triangle", "Array, Math, Sorting"],
      ["MEDIUM", "Longest Substring Without Repeating Characters", "Hash Table, String, Sliding Window"],
      ["HARD", "Maximum Profitable Triplets With Increasing Prices II", "Array, Binary Indexed Tree, Segment Tree"],
      ["EASY", "Average Value of Even Numbers That Are Divisible by Three", "Array, Math"],
      ["HARD", "Count the Number of Incremovable Subarrays II", "Array, Two Pointers, Binary Search"],
      ["EASY", "Find the Array Concatenation Value", "Array, Two Pointers, Simulation"],
      ["EASY", "Longest Common Prefix", "String, Trie"],
      ["MEDIUM", "Merge Intervals", "Array, Sorting"],
      ["EASY", "Maximum Units on a Truck", "Array, Greedy, Sorting"],
      ["MEDIUM", "Get Equal Substrings Within Budget", "String, Binary Search, Sliding Window, Prefix Sum"],
      ["EASY", "Valid Parentheses", "String, Stack"],
      ["EASY", "Count Binary Substrings", "Two Pointers, String"],
      ["MEDIUM", "Maximum Sum of Distinct Subarrays With Length K", "Array, Hash Table, Sliding Window"],
      ["HARD", "Numbers With Repeated Digits", "Math, Dynamic Programming"],
      ["MEDIUM", "Minimum Suffix Flips", "String, Greedy"],
      ["MEDIUM", "Letter Combinations of a Phone Number", "Hash Table, String, Backtracking"],
      ["MEDIUM", "Lexicographically Smallest String After Substring Operation", "String, Greedy"],
      ["MEDIUM", "Longest Palindromic Substring", "Two Pointers, String, Dynamic Programming"],
      ["EASY", "Merge Sorted Array", "Array, Two Pointers, Sorting"],
      ["MEDIUM", "Maximum Subarray", "Array, Divide and Conquer, Dynamic Programming"],
      ["MEDIUM", "Spiral Matrix", "Array, Matrix, Simulation"],
      ["MEDIUM", "Number of Divisible Substrings", "Hash Table, String, Counting, Prefix Sum"],
      ["MEDIUM", "Longest Consecutive Sequence", "Array, Hash Table, Union Find"],
      ["EASY", "Count Pairs Of Similar Strings", "Array, Hash Table, String, Bit Manipulation, Counting"],
      ["MEDIUM", "Group Anagrams", "Array, Hash Table, String, Sorting"],
      ["MEDIUM", "Shortest and Lexicographically Smallest Beautiful String", "String, Sliding Window"],
      ["MEDIUM", "Validate Binary Search Tree", "Tree, Depth-First Search, Binary Search Tree, Binary Tree"],
      ["EASY", "Climbing Stairs", "Math, Dynamic Programming, Memoization"],
      ["MEDIUM", "Subarray Product Less Than K", "Array, Binary Search, Sliding Window, Prefix Sum"],
      ["MEDIUM", "Minimum Swaps to Group All 1's Together II", "Array, Sliding Window"],
      ["MEDIUM", "Smallest Missing Non-negative Integer After Operations", "Array, Hash Table, Math, Greedy"],
      ["MEDIUM", "Divide Players Into Teams of Equal Skill", "Array, Hash Table, Two Pointers, Sorting"],
      ["EASY", "Find the Index of the First Occurrence in a String", "Two Pointers, String, String Matching"],
      ["MEDIUM", "Rotate Array", "Array, Math, Two Pointers"],
      ["MEDIUM", "Longest Increasing Subsequence", "Array, Binary Search, Dynamic Programming"],
      ["MEDIUM", "Find Minimum in Rotated Sorted Array", "Array, Binary Search"],
      ["MEDIUM", "Subsets", "Array, Backtracking, Bit Manipulation"],
      ["EASY", "Palindrome Number", "Math"],
      ["MEDIUM", "Subarray Sum Equals K", "Array, Hash Table, Prefix Sum"],
      ["MEDIUM", "Number of Operations to Make Network Connected", "Depth-First Search, Breadth-First Search, Union Find, Graph"],
      ["HARD", "Median of Two Sorted Arrays", "Array, Binary Search, Divide and Conquer"],
      ["EASY", "Intersection of Two Arrays", "Array, Hash Table, Two Pointers, Binary Search, Sorting"],
      ["MEDIUM", "Next Permutation", "Array, Two Pointers"],
      ["MEDIUM", "Product of Array Except Self", "Array, Prefix Sum"],
      ["EASY", "Flipping an Image", "Array, Two Pointers, Bit Manipulation, Matrix, Simulation"],
      ["HARD", "N-Queens", "Array, Backtracking"],
      ["EASY", "Backspace String Compare", "Two Pointers, String, Stack, Simulation"],
      ["MEDIUM", "Flip String to Monotone Increasing", "String, Dynamic Programming"],
      ["MEDIUM", "Single-Threaded CPU", "Array, Sorting, Heap (Priority Queue)"],
      ["MEDIUM", "Find The Original Array of Prefix Xor", "Array, Bit Manipulation"],
      ["HARD", "Trapping Rain Water", "Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack"],
      ["EASY", "Odd String Difference", "Array, Hash Table, String"],
      ["MEDIUM", "Rearrange Array to Maximize Prefix Score", "Array, Greedy, Sorting, Prefix Sum"],
      ["MEDIUM", "Minimum Number of Flips to Make the Binary String Alternating", "String, Dynamic Programming, Sliding Window"],
      ["EASY", "Majority Element", "Array, Hash Table, Divide and Conquer, Sorting, Counting"],
      ["MEDIUM", "LRU Cache", "Hash Table, Linked List, Design, Doubly-Linked List"],
      ["HARD", "Find All Possible Stable Binary Arrays II", "Dynamic Programming, Prefix Sum"],
      ["MEDIUM", "Generate Parentheses", "String, Dynamic Programming, Backtracking"],
      ["MEDIUM", "Least Number of Unique Integers after K Removals", "Array, Hash Table, Greedy, Sorting, Counting"],
      ["MEDIUM", "Find the Duplicate Number", "Array, Two Pointers, Binary Search, Bit Manipulation"],
      ["MEDIUM", "Increasing Triplet Subsequence", "Array, Greedy"],
      ["MEDIUM", "Find Longest Calls", "Database"],
      ["EASY", "Happy Number", "Hash Table, Math, Two Pointers"],
      ["MEDIUM", "Partition Equal Subset Sum", "Array, Dynamic Programming"],
      ["EASY", "Degree of an Array", "Array, Hash Table"],
      ["MEDIUM", "Word Break", "Array, Hash Table, String, Dynamic Programming, Trie, Memoization"],
      ["MEDIUM", "132 Pattern", "Array, Binary Search, Stack, Monotonic Stack, Ordered Set"],
      ["EASY", "The Employee That Worked on the Longest Task", "Array"],
      ["EASY", "Prime In Diagonal", "Array, Math, Matrix, Number Theory"],
      ["MEDIUM", "Minimum Operations to Reduce an Integer to 0", "Dynamic Programming, Greedy, Bit Manipulation"],
      ["MEDIUM", "Add Two Numbers", "Linked List, Math, Recursion"],
      ["MEDIUM", "Range Product Queries of Powers", "Array, Bit Manipulation, Prefix Sum"],
      ["MEDIUM", "Count Number of Teams", "Array, Dynamic Programming, Binary Indexed Tree, Segment Tree"],
      ["MEDIUM", "Task Scheduler", "Array, Hash Table, Greedy, Sorting, Heap (Priority Queue), Counting"],
      ["MEDIUM", "Removing Stars From a String", "String, Stack, Simulation"]
    ],
    zoho: [
      ["EASY", "Climbing Stairs", "Math, Dynamic Programming, Memoization"],
      ["MEDIUM", "Spiral Matrix", "Array, Matrix, Simulation"],
      ["EASY", "Best Time to Buy and Sell Stock", "Array, Dynamic Programming"],
      ["MEDIUM", "Longest Palindromic Substring", "Two Pointers, String, Dynamic Programming"],
      ["MEDIUM", "Longest Substring Without Repeating Characters", "Hash Table, String, Sliding Window"],
      ["MEDIUM", "Group Anagrams", "Array, Hash Table, String, Sorting"],
      ["EASY", "Valid Parentheses", "String, Stack"],
      ["MEDIUM", "Decode String", "String, Stack, Recursion"],
      ["MEDIUM", "Number of Islands", "Array, Depth-First Search, Breadth-First Search, Union Find, Matrix"],
      ["EASY", "Move Zeroes", "Array, Two Pointers"],
      ["HARD", "Trapping Rain Water", "Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack"],
      ["EASY", "Two Sum", "Array, Hash Table"],
      ["EASY", "Sort Even and Odd Indices Independently", "Array, Sorting"],
      ["MEDIUM", "Merge Intervals", "Array, Sorting"],
      ["MEDIUM", "Compare Version Numbers", "Two Pointers, String"],
      ["MEDIUM", "Rotate Image", "Array, Math, Matrix"],
      ["EASY", "Find Winner on a Tic Tac Toe Game", "Array, Hash Table, Matrix, Simulation"],
      ["MEDIUM", "Largest Number", "Array, String, Greedy, Sorting"],
      ["MEDIUM", "Remove All Occurrences of a Substring", "String, Stack, Simulation"],
      ["MEDIUM", "Zigzag Conversion", "String"],
      ["MEDIUM", "Container With Most Water", "Array, Two Pointers, Greedy"],
      ["MEDIUM", "Rotate Array", "Array, Math, Two Pointers"],
      ["MEDIUM", "Generate Parentheses", "String, Dynamic Programming, Backtracking"],
      ["EASY", "Longest Common Prefix", "String, Trie"],
      ["EASY", "Excel Sheet Column Number", "Math, String"],
      ["HARD", "Regular Expression Matching", "String, Dynamic Programming, Recursion"],
      ["EASY", "Roman to Integer", "Hash Table, Math, String"],
      ["HARD", "Text Justification", "Array, String, Simulation"],
      ["HARD", "Median of Two Sorted Arrays", "Array, Binary Search, Divide and Conquer"],
      ["HARD", "Wildcard Matching", "String, Dynamic Programming, Greedy, Recursion"],
      ["EASY", "Word Pattern", "Hash Table, String"],
      ["EASY", "Merge Sorted Array", "Array, Two Pointers, Sorting"],
      ["MEDIUM", "Search in Rotated Sorted Array", "Array, Binary Search"],
      ["MEDIUM", "Edit Distance", "String, Dynamic Programming"],
      ["HARD", "Longest Valid Parentheses", "String, Dynamic Programming, Stack"],
      ["MEDIUM", "Sort Colors", "Array, Two Pointers, Sorting"],
      ["EASY", "Happy Number", "Hash Table, Math, Two Pointers"],
      ["MEDIUM", "Valid Sudoku", "Array, Hash Table, Matrix"],
      ["MEDIUM", "Letter Combinations of a Phone Number", "Hash Table, String, Backtracking"],
      ["MEDIUM", "3Sum", "Array, Two Pointers, Sorting"],
      ["MEDIUM", "Basic Calculator II", "Math, String, Stack"],
      ["HARD", "Largest Rectangle in Histogram", "Array, Stack, Monotonic Stack"],
      ["MEDIUM", "Combination Sum", "Array, Backtracking"],
      ["MEDIUM", "Non-overlapping Intervals", "Array, Dynamic Programming, Greedy, Sorting"],
      ["MEDIUM", "Partition Equal Subset Sum", "Array, Dynamic Programming"],
      ["EASY", "Reverse Vowels of a String", "Two Pointers, String"],
      ["MEDIUM", "Product of Array Except Self", "Array, Prefix Sum"],
      ["EASY", "Replace Elements with Greatest Element on Right Side", "Array"],
      ["MEDIUM", "Find the Duplicate Number", "Array, Two Pointers, Binary Search, Bit Manipulation"],
      ["MEDIUM", "Decode Ways", "String, Dynamic Programming"],
      ["MEDIUM", "Best Time to Buy and Sell Stock II", "Array, Dynamic Programming, Greedy"],
      ["MEDIUM", "Restore IP Addresses", "String, Backtracking"],
      ["MEDIUM", "Longest Consecutive Sequence", "Array, Hash Table, Union Find"],
      ["HARD", "Integer to English Words", "Math, String, Recursion"],
      ["HARD", "Word Search II", "Array, String, Backtracking, Trie, Matrix"],
      ["MEDIUM", "Word Search", "Array, String, Backtracking, Depth-First Search, Matrix"],
      ["MEDIUM", "Spiral Matrix II", "Array, Matrix, Simulation"],
      ["EASY", "Merge Strings Alternately", "Two Pointers, String"],
      ["EASY", "Shuffle the Array", "Array"],
      ["MEDIUM", "Diagonal Traverse", "Array, Matrix, Simulation"],
      ["MEDIUM", "Count and Say", "String"],
      ["EASY", "Find the Index of the First Occurrence in a String", "Two Pointers, String, String Matching"],
      ["EASY", "Add to Array-Form of Integer", "Array, Math"],
      ["EASY", "Remove Duplicates from Sorted Array", "Array, Two Pointers"],
      ["EASY", "Palindrome Number", "Math"],
      ["EASY", "Single Number", "Array, Bit Manipulation"],
      ["MEDIUM", "3Sum Closest", "Array, Two Pointers, Sorting"],
      ["MEDIUM", "Jump Game", "Array, Dynamic Programming, Greedy"],
      ["MEDIUM", "Maximum Subarray", "Array, Divide and Conquer, Dynamic Programming"],
      ["MEDIUM", "House Robber", "Array, Dynamic Programming"],
      ["MEDIUM", "Subsets", "Array, Backtracking, Bit Manipulation"],
      ["MEDIUM", "Minimum Time Difference", "Array, Math, String, Sorting"],
      ["MEDIUM", "Word Break", "Array, Hash Table, String, Dynamic Programming, Trie, Memoization"],
      ["MEDIUM", "Reverse Words in a String", "Two Pointers, String"],
      ["EASY", "Maximum Population Year", "Array, Counting, Prefix Sum"],
      ["EASY", "Reverse Only Letters", "Two Pointers, String"],
      ["MEDIUM", "Find the Winner of the Circular Game", "Array, Math, Recursion, Queue, Simulation"],
      ["MEDIUM", "Asteroid Collision", "Array, Stack, Simulation"],
      ["MEDIUM", "Find Triangular Sum of an Array", "Array, Math, Simulation, Combinatorics"],
      ["MEDIUM", "Permutations", "Array, Backtracking"],
      ["MEDIUM", "Integer to Roman", "Hash Table, Math, String"],
      ["HARD", "N-Queens", "Array, Backtracking"],
      ["MEDIUM", "Longest Increasing Subsequence", "Array, Binary Search, Dynamic Programming"],
      ["EASY", "Search Insert Position", "Array, Binary Search"],
      ["MEDIUM", "Maximum Sum of an Hourglass", "Array, Matrix, Prefix Sum"],
      ["MEDIUM", "Remove Duplicates from Sorted Array II", "Array, Two Pointers"],
      ["MEDIUM", "Next Permutation", "Array, Two Pointers"],
      ["EASY", "Palindrome Linked List", "Linked List, Two Pointers, Stack, Recursion"],
      ["EASY", "Remove All Adjacent Duplicates In String", "String, Stack"],
      ["EASY", "Middle of the Linked List", "Linked List, Two Pointers"],
      ["MEDIUM", "Coin Change", "Array, Dynamic Programming, Breadth-First Search"],
      ["EASY", "Isomorphic Strings", "Hash Table, String"],
      ["MEDIUM", "Cinema Seat Allocation", "Array, Hash Table, Greedy, Bit Manipulation"],
      ["MEDIUM", "The Latest Time to Catch a Bus", "Array, Two Pointers, Binary Search, Sorting"],
      ["EASY", "First Unique Character in a String", "Hash Table, String, Queue, Counting"],
      ["EASY", "Excel Sheet Column Title", "Math, String"],
      ["EASY", "Binary Search", "Array, Binary Search"],
      ["MEDIUM", "Remove K Digits", "String, Stack, Greedy, Monotonic Stack"],
      ["MEDIUM", "Reverse Linked List II", "Linked List"],
      ["MEDIUM", "Unique Binary Search Trees", "Math, Dynamic Programming, Tree, Binary Search Tree, Binary Tree"]
    ]
  });

  // Company color mapping for better visualization
  const companyColors: Record<string, string> = {
    google: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    amazon: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    microsoft: 'bg-green-500/20 text-green-300 border-green-500/30',
    apple: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    meta: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    accenture: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    cognizant: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    capgemini: 'bg-green-500/20 text-green-300 border-green-500/30',
    deloitte: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    deltax: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    ibm: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    zoho: 'bg-red-500/20 text-red-300 border-red-500/30'
  };

  const difficultyColors = {
    EASY: 'bg-green-500/10 text-green-400 border-green-500/20',
    MEDIUM: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    HARD: 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  // Process and merge data
  const processMergedData = () => {
    setIsLoading(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const problemMap = new Map<string, ProcessedProblem>();

      // Process each company's data
      Object.entries(rawData).forEach(([company, problems]) => {
        problems.forEach(([difficulty, title, topics]) => {
          const key = title.toLowerCase().trim();

          if (problemMap.has(key)) {
            const existing = problemMap.get(key)!;
            if (!existing.companies.includes(company)) {
              existing.companies.push(company);
            }
          } else {
            problemMap.set(key, {
              title,
              difficulty,
              topics: topics.split(', ').map(t => t.trim()),
              companies: [company]
            });
          }
        });
      });

      // Group by topics
      const topicGroups = new Map<string, Problem[]>();

      problemMap.forEach((problem) => {
        problem.topics.forEach(topic => {
          if (!topicGroups.has(topic)) {
            topicGroups.set(topic, []);
          }
          topicGroups.get(topic)!.push({
            problem: problem.title,
            difficulty: problem.difficulty,
            companies: problem.companies.join(', ')
          });
        });
      });

      // Convert to array and sort
      const result: TopicGroup[] = Array.from(topicGroups.entries())
        .map(([topic, problems]) => ({
          topic,
          problems: problems.sort((a, b) => {
            // Sort by difficulty first, then by name
            const diffOrder = { 'EASY': 0, 'MEDIUM': 1, 'HARD': 2 };
            const diffA = diffOrder[a.difficulty as keyof typeof diffOrder];
            const diffB = diffOrder[b.difficulty as keyof typeof diffOrder];
            
            if (diffA !== diffB) return diffA - diffB;
            return a.problem.localeCompare(b.problem);
          }),
          count: problems.length
        }))
        .sort((a, b) => b.count - a.count);

      setMergedData(result);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    processMergedData();
  }, [rawData]);

  // Filter data based on search and selections
  const filteredData = useMemo(() => {
    return mergedData.filter(group => {
      const matchesTopic = !selectedTopic || group.topic === selectedTopic;
      const matchesSearch = !searchTerm || 
        group.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.problems.some(p => p.problem.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDifficulty = !selectedDifficulty || 
        group.problems.some(p => p.difficulty === selectedDifficulty);

      const matchesCompany = !selectedCompany ||
        group.problems.some(p => p.companies.toLowerCase().includes(selectedCompany.toLowerCase()));

      return matchesTopic && matchesSearch && matchesDifficulty && matchesCompany;
    });
  }, [mergedData, searchTerm, selectedTopic, selectedDifficulty, selectedCompany]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalProblems = filteredData.reduce((sum, group) => sum + group.problems.length, 0);
    const companies = Object.keys(rawData);
    const difficulties = ['EASY', 'MEDIUM', 'HARD'];
    
    const difficultyStats = difficulties.map(diff => ({
      difficulty: diff,
      count: filteredData.reduce((sum, group) => 
        sum + group.problems.filter(p => p.difficulty === diff).length, 0
      )
    }));

    return {
      totalProblems,
      totalTopics: filteredData.length,
      totalCompanies: companies.length,
      difficultyStats,
      companies
    };
  }, [filteredData, rawData]);

  const toggleTopic = (topic: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topic)) {
      newExpanded.delete(topic);
    } else {
      newExpanded.add(topic);
    }
    setExpandedTopics(newExpanded);
  };

  const exportToCSV = () => {
    const csvContent = filteredData.flatMap(group => 
      group.problems.map(problem => 
        `"${group.topic}","${problem.problem}","${problem.difficulty}","${problem.companies}"`
      )
    );

    const header = 'Topic,Problem,Difficulty,Companies';
    const csv = [header, ...csvContent].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leetcode-problems-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTopic('');
    setSelectedDifficulty('');
    setSelectedCompany('');
  };

  const expandAll = () => {
    setExpandedTopics(new Set(filteredData.map(g => g.topic)));
  };

  const collapseAll = () => {
    setExpandedTopics(new Set());
  };

  const addNewCompanyData = () => {
    try {
      const lines = newDataInput.trim().split('\n');
      const companyName = lines[0].toLowerCase().trim();
      
      if (!companyName) {
        alert('Please enter a company name on the first line');
        return;
      }

      const problems = lines.slice(1).map(line => {
        const parts = line.split('|').map(part => part.trim());
        if (parts.length !== 3) {
          throw new Error(`Invalid format in line: ${line}`);
        }
        return [parts[0], parts[1], parts[2]];
      });

      setRawData(prev => ({
        ...prev,
        [companyName]: problems
      }));

      setNewDataInput('');
      setShowAddData(false);
    } catch (error) {
      alert('Invalid format. Please check your input.');
    }
  };

  const allTopics = [...new Set(mergedData.map(g => g.topic))].sort();
  const allDifficulties = ['EASY', 'MEDIUM', 'HARD'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Processing company data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <Code className="w-8 h-8 text-orange-500" />
                <span className="text-orange-500">LeetCode</span>
                <span className="text-gray-500 text-2xl">×</span>
                <span>Companies</span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl">
                Comprehensive analysis of coding problems from top tech companies
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-700">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400 text-sm">Companies</span>
                </div>
                <span className="text-white font-bold text-lg">{stats.totalCompanies}</span>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-700">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400 text-sm">Topics</span>
                </div>
                <span className="text-orange-500 font-bold text-lg">{stats.totalTopics}</span>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-700">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-gray-400 text-sm">Problems</span>
                </div>
                <span className="text-green-400 font-bold text-lg">{stats.totalProblems}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Enhanced Filters */}
        <div className="mb-8 p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Filter className="w-5 h-5 text-orange-500" />
              Filters & Search
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'table' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'cards' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Cards
                </button>
              </div>
              <button
                onClick={() => setShowAddData(true)}
                className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Data
              </button>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search problems or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Topic Filter */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            >
              <option value="">All Topics</option>
              {allTopics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            >
              <option value="">All Difficulties</option>
              {allDifficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>

            {/* Company Filter */}
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            >
              <option value="">All Companies</option>
              {stats.companies.map(company => (
                <option key={company} value={company} className="capitalize">{company}</option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Add Data Modal */}
        {showAddData && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Add Company Data</h3>
                <button
                  onClick={() => setShowAddData(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">
                  Format: First line = company name, then: DIFFICULTY|Problem Name|Topics (comma separated)
                </p>
                <p className="text-gray-500 text-xs mb-4">
                  Example:<br/>
                  netflix<br/>
                  MEDIUM|Two Sum|Array, Hash Table<br/>
                  HARD|Median Arrays|Array, Binary Search
                </p>
                <textarea
                  value={newDataInput}
                  onChange={(e) => setNewDataInput(e.target.value)}
                  placeholder="netflix&#10;MEDIUM|Two Sum|Array, Hash Table&#10;HARD|Median Arrays|Array, Binary Search"
                  className="w-full h-48 p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddData(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewCompanyData}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Add Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Difficulty Stats Bar */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.difficultyStats.map(({ difficulty, count }) => (
            <div key={difficulty} className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}>
                  {difficulty}
                </span>
                <span className="text-white font-bold text-lg">{count}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    difficulty === 'EASY' ? 'bg-green-500' :
                    difficulty === 'MEDIUM' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${stats.totalProblems > 0 ? (count / stats.totalProblems) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-orange-500" />
              Problem Topics
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={expandAll}
                  className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Collapse All
                </button>
              </div>
              <span className="text-gray-400 text-sm">
                {filteredData.length} topic{filteredData.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>

          {filteredData.length === 0 ? (
            <div className="text-center py-16 bg-gray-900/50 rounded-2xl border border-gray-800">
              <div className="text-gray-400 text-xl mb-4">No problems found</div>
              <div className="text-gray-500">Try adjusting your search criteria or add some data</div>
            </div>
          ) : (
            filteredData.map((group) => (
              <div key={group.topic} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
                {/* Topic Header */}
                <div 
                  className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 cursor-pointer hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
                  onClick={() => toggleTopic(group.topic)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {expandedTopics.has(group.topic) ? 
                        <ChevronDown className="w-5 h-5 text-orange-500" /> : 
                        <ChevronRight className="w-5 h-5 text-orange-500" />
                      }
                      <h3 className="text-xl font-bold text-white">{group.topic}</h3>
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium">
                        {group.count} problems
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Problems List */}
                {expandedTopics.has(group.topic) && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800/50">
                        <tr>
                          <th className="text-left py-4 px-6 text-orange-400 font-semibold text-sm uppercase tracking-wider">
                            Problem
                          </th>
                          <th className="text-left py-4 px-6 text-orange-400 font-semibold text-sm uppercase tracking-wider">
                            Difficulty
                          </th>
                          <th className="text-left py-4 px-6 text-orange-400 font-semibold text-sm uppercase tracking-wider">
                            Companies
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.problems.map((problem, idx) => (
                          <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors group">
                            <td className="py-4 px-6">
                              <span className="text-white font-medium group-hover:text-orange-400 transition-colors cursor-pointer">
                                {problem.problem}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${difficultyColors[problem.difficulty as keyof typeof difficultyColors]}`}>
                                {problem.difficulty}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-2">
                                {problem.companies.split(', ').map((company, companyIdx) => (
                                  <span key={companyIdx} className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${companyColors[company] || 'bg-gray-600/20 text-gray-300'}`}>
                                    {company}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProblemsMerger;