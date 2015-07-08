# RLE压缩算法ruby实现
def encode(str)
  puts "压缩前: #{str}"

  res = '' 
  i = 0
  j = 0
  len = str.length

  while j < len
    # 一个字节自能存255
    while j < len && str[j] == str[i] && j - i <= 255
      j += 1
    end

    if j - i == 1
      res << str[i]
    else
      res << '*'            # 控制字符
      res << (j - i).to_s   # 重复字符个数
      res << str[i]         # 重复字符
    end

    i = j
  end

  puts "压缩后: #{res}"
end

# 测试
['abc', 'abbcccc', 'aaaaccddef', 'abcddeeffffghii'].each do |str|
  encode(str)
end
