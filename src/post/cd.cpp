#include <iostream>
#include <thread>
#include <chrono>
#include <random>
#include <vector>
#include <atomic>

class RingBuffer {
private:
    std::vector<int> buffer;
    int capacity;
    std::atomic<int> head;
    std::atomic<int> tail;
    std::atomic<int> size;

public:
    RingBuffer(int capacity) : capacity(capacity), head(0), tail(0), size(0) {
        buffer.resize(capacity);
    }

    bool is_empty() {
        return size == 0;
    }

    bool is_full() {
        return size == capacity;
    }

    void enqueue(int data) {
        if (is_full()) {
            return;  // 버퍼가 가득 차면 저장하지 않음
        }
        buffer[tail] = data;
        tail = (tail + 1) % capacity;
        size++;
    }

    int dequeue() {
        if (is_empty()) {
            return -1; // 버퍼가 비었으면 -1 출력
        }
        int data = buffer[head];
        head = (head + 1) % capacity;
        size--;
        return data;
    }
};

void dataProducer(RingBuffer& buffer, double meanTime, double variance) {
    std::random_device rd; // 난수 발생기
    std::mt19937 gen(rd()); // seed 설정
    std::normal_distribution<> dist(meanTime, variance); // 가우시안 분포 

    int data = 0;
    while (true) {
        std::this_thread::sleep_for(std::chrono::milliseconds(static_cast<int>(dist(gen)))); // 발생시간만큼 delay
        buffer.enqueue(data++);
    }
}

void dataConsumer(RingBuffer& buffer, double meanTime, double variance) {
    std::random_device rd;
    std::mt19937 gen(rd()); 
    std::normal_distribution<> dist(meanTime, variance);

    int expectedData = 0;
    while (true) {
        std::this_thread::sleep_for(std::chrono::milliseconds(static_cast<int>(dist(gen))));
        int data = buffer.dequeue();
        if (data != expectedData) {
            std::cout << "데이터 누락: 예상 " << expectedData << ", 실제 " << data << std::endl;
        }
        expectedData++;
    }
}

int main() {
    int bufferSize = 10;
    // 시뮬레이션 (a) : data의 평균발생속도보다 평균 처리 속도가 빠른 경우
    double producerMeanTime = 50;  // 평균 발생 시간
    double producerVariance = 50;   // 분산
    double consumerMeanTime = 100;  // 평균 처리 시간
    double consumerVariance = 50;   // 분산

    RingBuffer buffer(bufferSize);

    std::thread producerThread(dataProducer, std::ref(buffer), producerMeanTime, producerVariance);
    std::thread consumerThread(dataConsumer, std::ref(buffer), consumerMeanTime, consumerVariance);

    producerThread.join();
    consumerThread.join();

    return 0;
}
