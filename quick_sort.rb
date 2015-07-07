# quick sort in ruby

def quick_sort(nums)
  puts "before sort: #{nums}"

  do_quick_sort(0, nums.length - 1, nums)

  puts "after sort: #{nums}"
end

def do_quick_sort(low, high, nums)
  return if low >= high

  mid_idx = partition(low, high, nums)

  do_quick_sort(low, mid_idx - 1, nums)
  do_quick_sort(mid_idx + 1, high, nums)
end

# partition nums according to the first item
# return the index of the first item when nums is sorted
def partition(low, high, nums)
  m = nums[low]
  l = low + 1
  r = high

  while l <= r
    while l <= high && nums[l] <= m
      l += 1
    end

    while r >= low && nums[r] > m
      r -= 1
    end

    if l < r
      swap(l, r, nums)
      l += 1
      r -= 1
    else
      break
    end
  end

  swap(low, r, nums)
  r
end

# swap i-th and j-th item of nums
def swap(i, j, nums)
  tmp = nums[i]
  nums[i] = nums[j]
  nums[j] = tmp
end

# check if nums is sorted
def sorted?(nums)
  return true if nums.length <= 1

  (0..nums.length - 2).each do |i|
    if nums[i] > nums[i + 1]
      return false
    end
  end

  true
end

# test
(20..100).each do |i|
  nums = (1..i).to_a.shuffle
  quick_sort(nums)

  unless sorted?(nums)
    puts "Incorrect algorithm, go on debug!!!"
    break
  end
end
